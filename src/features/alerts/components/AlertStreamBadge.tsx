import type { AlertConnectionStatus } from '@/features/alerts/types'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'

function statusLabel(status: AlertConnectionStatus) {
  if (status === 'connected') return '实时推送中'
  if (status === 'connecting') return '连接中…'
  if (status === 'disconnected') return '已断开'
  return '未连接'
}

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

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="inline-flex items-center gap-2 border border-city-fog/25 px-2.5 py-1.5 text-xs text-city-fog"
        title={statusLabel(connectionStatus)}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${statusDotClass(connectionStatus)}`}
          aria-hidden
        />
        <span>{statusLabel(connectionStatus)}</span>
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
          全部已读
        </button>
      ) : null}

      {connectionStatus === 'disconnected' && onReconnect ? (
        <button
          type="button"
          onClick={onReconnect}
          className="border border-city-amber/40 px-2.5 py-1.5 text-xs text-city-amber transition hover:border-city-amber hover:text-city-snow"
        >
          重连
        </button>
      ) : null}
    </div>
  )
}
