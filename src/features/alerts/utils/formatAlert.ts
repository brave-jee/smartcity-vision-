import type { AlertLevel } from '@/features/alerts/types'

/** 告警等级圆点色 */
export function alertLevelDotClass(level: AlertLevel) {
  if (level === 'critical') return 'bg-city-crimson'
  if (level === 'warning') return 'bg-city-amber'
  return 'bg-city-mint'
}

/** 告警等级标签文案 */
export function alertLevelLabel(level: AlertLevel) {
  if (level === 'critical') return '严重'
  if (level === 'warning') return '警告'
  return '提示'
}

/**
 * 相对时间展示（中文简体）。
 */
export function formatAlertRelativeTime(createdAt: number, now = Date.now()) {
  const diffSec = Math.max(0, Math.floor((now - createdAt) / 1000))
  if (diffSec < 5) return '刚刚'
  if (diffSec < 60) return `${diffSec} 秒前`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} 分钟前`
  return new Date(createdAt).toLocaleTimeString('zh-CN', { hour12: false })
}
