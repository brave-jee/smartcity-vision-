import { OP_LOG_CATEGORY_LABEL, OP_LOG_CATEGORY_OPTIONS } from '@/features/logs/constants'
import type { OpLogCategory } from '@/features/logs/types'

type OpLogFiltersProps = {
  category: OpLogCategory | 'all'
  keyword: string
  onCategoryChange: (category: OpLogCategory | 'all') => void
  onKeywordChange: (keyword: string) => void
}

/**
 * 分类按钮 + 关键词搜索。
 */
export function OpLogFilters({
  category,
  keyword,
  onCategoryChange,
  onKeywordChange,
}: OpLogFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {OP_LOG_CATEGORY_OPTIONS.map((option) => {
          const active = option === category
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                onCategoryChange(option)
              }}
              className={`px-2.5 py-1 text-xs transition ${
                active ? 'bg-city-teal/25 text-city-mint' : 'text-city-fog hover:text-city-mint'
              }`}
            >
              {OP_LOG_CATEGORY_LABEL[option]}
            </button>
          )
        })}
      </div>

      <label className="block w-full sm:max-w-xs">
        <span className="sr-only">搜索日志</span>
        <input
          type="search"
          value={keyword}
          placeholder="搜索操作人 / 标题 / 对象"
          onChange={(event) => {
            onKeywordChange(event.target.value)
          }}
          className="w-full border border-city-fog/25 bg-city-panel/50 px-3 py-2 text-sm text-city-snow outline-none placeholder:text-city-fog/50 focus:border-city-mint"
        />
      </label>
    </div>
  )
}
