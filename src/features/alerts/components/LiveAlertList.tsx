import { useEffect, useState } from 'react'
import { useAiAnalysis } from '@/features/ai-events/hooks/useAiAnalysis'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { alertLevelDotClass } from '@/features/alerts/utils/formatAlert'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'
import { appendOpLog } from '@/features/logs/utils/appendOpLog'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import {
  formatAlertRelativeTimeLocalized,
  getAlertLevelLabel,
} from '@/features/settings/i18n/appCopy'

/**
 * 实时告警列表：由 Mock WebSocket 推送驱动。
 */
export function LiveAlertList() {
  const alerts = useAlertStore((s) => s.alerts)
  const acknowledgeAlert = useAlertStore((s) => s.acknowledgeAlert)
  const actor = useAuthStore((s) => s.user?.displayName ?? s.user?.username ?? '城市指挥员')
  const { analyzeAlert, alert: activeAlert, status: aiStatus } = useAiAnalysis()
  const activeAlertId = activeAlert?.id ?? null
  const [now, setNow] = useState(() => Date.now())
  const { copy, locale } = useAppCopy()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  if (alerts.length === 0) {
    return <p className="text-sm text-city-fog">{copy.alerts.waiting}</p>
  }

  return (
    <ul className="space-y-3">
      {alerts.map((alert, index) => {
        const isNewest = index === 0 && !alert.acknowledged
        return (
          <li
            key={alert.id}
            className={`flex gap-3 border-l-2 pl-3 transition ${
              isNewest
                ? 'border-city-mint/70 bg-city-mint/5'
                : alert.acknowledged
                  ? 'border-transparent opacity-55'
                  : 'border-city-fog/20'
            }`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${alertLevelDotClass(alert.level)}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm text-city-snow">{alert.title}</p>
                <span className="shrink-0 text-[10px] tracking-wide text-city-fog">
                  {getAlertLevelLabel(copy, alert.level)}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-city-fog">
                {alert.district} · {alert.source}
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <p className="text-xs text-city-fog/80">
                  {formatAlertRelativeTimeLocalized(copy, locale, alert.createdAt, now)}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      void analyzeAlert(alert)
                    }}
                    className={`text-[10px] transition ${
                      activeAlertId === alert.id && aiStatus !== 'idle'
                        ? 'text-city-snow'
                        : 'text-city-mint hover:text-city-snow'
                    }`}
                  >
                    {activeAlertId === alert.id &&
                    (aiStatus === 'loading' || aiStatus === 'streaming')
                      ? copy.alerts.analyzing
                      : copy.alerts.analyze}
                  </button>
                  {alert.acknowledged ? (
                    <span className="text-[10px] text-city-fog">{copy.alerts.confirmed}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        acknowledgeAlert(alert.id)
                        appendOpLog({
                          actor,
                          action: 'acknowledge',
                          title: '确认告警',
                          category: 'alert',
                          target: alert.title,
                          detail: `片区：${alert.district}`,
                        })
                      }}
                      className="text-[10px] text-city-mint transition hover:text-city-snow"
                    >
                      {copy.alerts.confirm}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
