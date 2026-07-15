import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import { getAlertStatusLabel } from '@/features/settings/i18n/appCopy'
import type { AlertConnectionStatus } from '@/features/alerts/types'

function statusDotClass(status: AlertConnectionStatus) {
  if (status === 'connected') return 'bg-city-mint animate-pulse'
  if (status === 'connecting') return 'bg-city-amber'
  return 'bg-city-fog'
}

type AlertStreamBadgeProps = {
  onReconnect?: () => void
}

/**
 * 顶栏角标：连接状态 + 未读数。
 */
export function AlertStreamBadge({ onReconnect }: AlertStreamBadgeProps) {
  const connectionStatus = useAlertStore((s) => s.connectionStatus)
  const unreadCount = useAlertStore((s) => s.unreadCount)
  const markAllRead = useAlertStore((s) => s.markAllRead)
  const pendingCount = useAlertStore((s) => s.alerts.filter((item) => !item.acknowledged).length)
  const { copy } = useAppCopy()
  const statusText = getAlertStatusLabel(copy, connectionStatus)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="inline-flex items-center gap-2 border border-city-fog/25 px-2.5 py-1.5 text-xs text-city-fog"
        title={statusText}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${statusDotClass(connectionStatus)}`}
          aria-hidden
        />
        <span>{statusText}</span>
        {unreadCount > 0 ? (
          <span className="min-w-[1.25rem] rounded-sm bg-city-crimson/90 px-1 text-center text-[10px] leading-4 font-medium text-city-snow">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </div>

      {pendingCount > 0 ? (
        <button
          type="button"
          onClick={markAllRead}
          className="border border-city-fog/30 px-2.5 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint"
        >
          {copy.alerts.markAllRead}
        </button>
      ) : null}

      {connectionStatus === 'disconnected' && onReconnect ? (
        <button
          type="button"
          onClick={onReconnect}
          className="border border-city-amber/40 px-2.5 py-1.5 text-xs text-city-amber transition hover:border-city-amber hover:text-city-snow"
        >
          {copy.alerts.reconnect}
        </button>
      ) : null}
    </div>
  )
}
