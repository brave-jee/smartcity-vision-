import type { OpLogEntry } from '@/features/logs/types'
import { formatOpLogTime, opLogCategoryDotClass } from '@/features/logs/utils/formatOpLog'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import { getOpLogCategoryLabel } from '@/features/settings/i18n/appCopy'

type OpLogTableProps = {
  items: OpLogEntry[]
}

/**
 * 操作日志表：时间线感列表，避免卡片堆叠。
 */
export function OpLogTable({ items }: OpLogTableProps) {
  const { copy, locale } = useAppCopy()

  if (items.length === 0) {
    return <p className="py-10 text-sm text-city-fog">{copy.logs.empty}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-city-fog/20 text-[10px] tracking-[0.16em] text-city-fog uppercase">
            <th className="py-2 pr-3 font-normal">{copy.logs.colTime}</th>
            <th className="py-2 pr-3 font-normal">{copy.logs.colCategory}</th>
            <th className="py-2 pr-3 font-normal">{copy.logs.colAction}</th>
            <th className="py-2 pr-3 font-normal">{copy.logs.colActor}</th>
            <th className="py-2 font-normal">{copy.logs.colTarget}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-city-fog/10 align-top">
              <td className="py-3 pr-3 whitespace-nowrap text-xs text-city-fog">
                {formatOpLogTime(item.createdAt, locale)}
              </td>
              <td className="py-3 pr-3">
                <span className="inline-flex items-center gap-2 text-xs text-city-fog">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${opLogCategoryDotClass(item.category)}`}
                    aria-hidden
                  />
                  {getOpLogCategoryLabel(copy, item.category)}
                </span>
              </td>
              <td className="py-3 pr-3 text-city-snow">{item.title}</td>
              <td className="py-3 pr-3 text-xs text-city-fog">{item.actor}</td>
              <td className="py-3 text-xs leading-relaxed text-city-fog">
                {item.target ? <span className="text-city-snow/90">{item.target}</span> : null}
                {item.target && item.detail ? <span className="text-city-fog/50"> · </span> : null}
                {item.detail ? <span>{item.detail}</span> : null}
                {!item.target && !item.detail ? <span className="text-city-fog/50">—</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
