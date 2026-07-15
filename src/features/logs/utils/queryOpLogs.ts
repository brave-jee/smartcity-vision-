import type { OpLogEntry, OpLogPage, OpLogQuery } from '@/features/logs/types'

/**
 * 对日志队列做分类 / 关键词过滤与分页（纯函数，便于 hook 同步派生）。
 */
export function queryOpLogs(entries: OpLogEntry[], query: OpLogQuery): OpLogPage {
  const keyword = query.keyword.trim().toLowerCase()
  const filtered = entries.filter((item) => {
    if (query.category !== 'all' && item.category !== query.category) return false
    if (!keyword) return true
    const haystack = [item.actor, item.title, item.action, item.target, item.detail]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(keyword)
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize) || 1)
  const page = Math.min(Math.max(1, query.page), totalPages)
  const start = (page - 1) * query.pageSize

  return {
    items: filtered.slice(start, start + query.pageSize),
    total,
    page,
    pageSize: query.pageSize,
    totalPages,
  }
}
