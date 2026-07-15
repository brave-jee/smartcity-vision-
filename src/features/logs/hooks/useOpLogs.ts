import { useMemo, useState } from 'react'
import { OP_LOG_PAGE_SIZE } from '@/features/logs/constants'
import { useOpLogStore } from '@/features/logs/stores/useOpLogStore'
import type { OpLogCategory } from '@/features/logs/types'
import { queryOpLogs } from '@/features/logs/utils/queryOpLogs'

/**
 * 操作日志列表：筛选 + 分页（从 store 同步派生）。
 */
export function useOpLogs() {
  const entries = useOpLogStore((s) => s.entries)
  const [category, setCategory] = useState<OpLogCategory | 'all'>('all')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const data = useMemo(
    () =>
      queryOpLogs(entries, {
        page,
        pageSize: OP_LOG_PAGE_SIZE,
        category,
        keyword,
      }),
    [entries, page, category, keyword],
  )

  function changeCategory(next: OpLogCategory | 'all') {
    setCategory(next)
    setPage(1)
  }

  function changeKeyword(next: string) {
    setKeyword(next)
    setPage(1)
  }

  return {
    data,
    category,
    keyword,
    page: data.page,
    setPage,
    changeCategory,
    changeKeyword,
  }
}
