import { LiveNumber } from '@/features/dashboard/components/LiveNumber'
import type { DashboardMetric } from '@/features/dashboard/types'

type MetricListProps = {
  metrics: DashboardMetric[]
}

/** 根据趋势返回配色 class */
function trendClass(trend: DashboardMetric['trend']) {
  if (trend === 'up') return 'text-city-mint'
  if (trend === 'down') return 'text-city-amber'
  return 'text-city-fog'
}

/**
 * 左侧 KPI 列表：单列指标，数值带实时过渡动画。
 */
export function MetricList({ metrics }: MetricListProps) {
  return (
    <ul className="space-y-5">
      {metrics.map((item) => (
        <li key={item.id} className="border-l border-city-teal/50 pl-3">
          <p className="text-xs tracking-wide text-city-fog">{item.label}</p>
          <LiveNumber
            className="mt-1 block font-display text-2xl tracking-wide text-city-snow sm:text-[1.7rem]"
            value={item.numericValue}
            decimals={item.decimals}
            suffix={item.suffix}
            useGrouping={item.useGrouping}
          />
          <p className={`mt-1 text-xs ${trendClass(item.trend)}`}>{item.delta}</p>
        </li>
      ))}
    </ul>
  )
}
