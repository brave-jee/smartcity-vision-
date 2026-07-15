import type { DashboardAlertPreview } from '@/features/dashboard/types'

type AlertPreviewListProps = {
  alerts: DashboardAlertPreview[]
}

/** 告警等级指示色 */
function levelDotClass(level: DashboardAlertPreview['level']) {
  if (level === 'critical') return 'bg-city-crimson'
  if (level === 'warning') return 'bg-city-amber'
  return 'bg-city-mint'
}

/**
 * 右侧告警预览列表。
 * 完整 WebSocket 实时推送将在告警模块接入。
 */
export function AlertPreviewList({ alerts }: AlertPreviewListProps) {
  return (
    <ul className="space-y-4">
      {alerts.map((alert) => (
        <li key={alert.id} className="flex gap-3">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${levelDotClass(alert.level)}`}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-sm text-city-snow">{alert.title}</p>
            <p className="mt-1 text-xs text-city-fog">{alert.time}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
