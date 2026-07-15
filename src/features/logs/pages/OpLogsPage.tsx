import { OpLogFilters } from '@/features/logs/components/OpLogFilters'
import { OpLogTable } from '@/features/logs/components/OpLogTable'
import { useOpLogs } from '@/features/logs/hooks/useOpLogs'

/**
 * 操作日志页：筛选、分页、本地审计队列。
 */
export function OpLogsPage() {
  const { data, category, keyword, page, setPage, changeCategory, changeKeyword } = useOpLogs()

  const items = data.items
  const total = data.total
  const totalPages = data.totalPages

  return (
    <main className="flex h-full min-h-0 flex-col overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
      <div className="mb-4 shrink-0">
        <h1 className="font-display text-base tracking-wide text-city-snow sm:text-lg">操作日志</h1>
        <p className="mt-0.5 text-xs text-city-fog">
          谁做了什么 · 本地演示队列（可筛选分页）
          {total > 0 ? ` · 共 ${total} 条` : null}
        </p>
      </div>

      <section className="flex min-h-0 flex-1 flex-col border border-city-fog/15 bg-city-panel/20 p-4">
        <OpLogFilters
          category={category}
          keyword={keyword}
          onCategoryChange={changeCategory}
          onKeywordChange={changeKeyword}
        />

        <div className="mt-4 min-h-0 flex-1">
          <OpLogTable items={items} />
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-city-fog/15 pt-3">
          <p className="text-xs text-city-fog">
            第 {page} / {totalPages} 页
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                setPage(Math.max(1, page - 1))
              }}
              className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一页
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => {
                setPage(page + 1)
              }}
              className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一页
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
