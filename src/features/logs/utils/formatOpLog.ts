import type { OpLogCategory } from '@/features/logs/types'

/** 分类色点 */
export function opLogCategoryDotClass(category: OpLogCategory) {
  if (category === 'auth') return 'bg-city-mint'
  if (category === 'alert') return 'bg-city-amber'
  if (category === 'ai') return 'bg-city-teal'
  if (category === 'scene') return 'bg-city-fog'
  return 'bg-city-fog/60'
}

/** 绝对时间 */
export function formatOpLogTime(ts: number) {
  return new Date(ts).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}
