import type { TrendPoint } from '@/features/dashboard/types'

type TrendBarsProps = {
  title: string
  points: TrendPoint[]
}

/**
 * 轻量趋势条：本模块不用 ECharts，仅用 CSS 柱状示意。
 */
export function TrendBars({ title, points }: TrendBarsProps) {
  const max = Math.max(...points.map((p) => p.value), 1)

  return (
    <div>
      <p className="text-xs tracking-wide text-city-fog">{title}</p>
      <div className="mt-3 flex h-24 items-end gap-1.5 sm:gap-2">
        {points.map((point) => {
          const height = `${Math.max(12, (point.value / max) * 100)}%`
          return (
            <div key={point.label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex h-20 w-full items-end">
                <div
                  className="w-full bg-city-teal/70 transition-[height] duration-500"
                  style={{ height }}
                  title={`${point.label}: ${point.value}`}
                />
              </div>
              <span className="w-full truncate text-center text-[10px] text-city-fog/80">
                {point.label.slice(0, 2)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
