import { AlertLevelPieChart } from '@/features/charts/components/AlertLevelPieChart'
import { EnergyBarChart } from '@/features/charts/components/EnergyBarChart'
import { EnergyTrendChart } from '@/features/charts/components/EnergyTrendChart'
import { TrafficLineChart } from '@/features/charts/components/TrafficLineChart'
import type { TrendPoint } from '@/features/dashboard/types'

type ChartsAnalyticsPanelProps = {
  trafficTrend: TrendPoint[]
  energyTrend: TrendPoint[]
}

/** Bottom analytics dock */
export function ChartsAnalyticsPanel({ trafficTrend, energyTrend }: ChartsAnalyticsPanelProps) {
  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
        <p className="font-display text-[10px] tracking-[0.18em] text-city-mint uppercase">
          Analytics
        </p>
        <p className="text-[10px] text-city-fog">ECharts</p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 xl:grid-cols-4">
        <TrafficLineChart points={trafficTrend} />
        <EnergyTrendChart energyPoints={energyTrend} trafficPoints={trafficTrend} />
        <EnergyBarChart points={energyTrend} />
        <AlertLevelPieChart />
      </div>
    </section>
  )
}
