import { OP_LOG_CATEGORY_OPTIONS } from '@/features/logs/constants'
import type { OpLogCategory } from '@/features/logs/types'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import { getOpLogCategoryLabel } from '@/features/settings/i18n/appCopy'

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
  const { copy } = useAppCopy()

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
              {getOpLogCategoryLabel(copy, option)}
            </button>
          )
        })}
      </div>

      <label className="block w-full sm:max-w-xs">
        <span className="sr-only">{copy.logs.searchAria}</span>
        <input
          type="search"
          value={keyword}
          placeholder={copy.logs.searchPlaceholder}
          onChange={(event) => {
            onKeywordChange(event.target.value)
          }}
          className="w-full border border-city-fog/25 bg-city-panel/50 px-3 py-2 text-sm text-city-snow outline-none placeholder:text-city-fog/50 focus:border-city-mint"
        />
      </label>
    </div>
  )
}
