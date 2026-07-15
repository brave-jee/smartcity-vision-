import { useOpLogStore } from '@/features/logs/stores/useOpLogStore'
import type { OpLogPage, OpLogQuery } from '@/features/logs/types'
import { queryOpLogs } from '@/features/logs/utils/queryOpLogs'

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * Mock：GET /api/logs?page&pageSize&category&keyword
 * 当前从本地队列过滤分页，日后可换成真实 HTTP。
 */
export async function fetchOpLogs(query: OpLogQuery): Promise<OpLogPage> {
  await delay(100)
  return queryOpLogs(useOpLogStore.getState().entries, query)
}
