import { useMemo } from 'react'
import type { EChartsCoreOption } from 'echarts/core'
import { ChartCard } from '@/features/charts/components/ChartCard'
import { EChart } from '@/features/charts/components/EChart'
import { buildDistrictEnergyRanks } from '@/features/charts/data/chartMocks'
import { CHART_COLORS, chartAxisTextStyle, chartTooltipStyle } from '@/features/charts/theme'
import type { TrendPoint } from '@/features/dashboard/types'

type EnergyBarChartProps = {
  points: TrendPoint[]
}

export function EnergyBarChart({ points }: EnergyBarChartProps) {
  const ranks = useMemo(() => buildDistrictEnergyRanks(points), [points])

  const option = useMemo<EChartsCoreOption>(() => {
    const ordered = [...ranks].sort((a, b) => a.value - b.value)
    return {
      animationDuration: 400,
      grid: { left: 52, right: 20, top: 6, bottom: 6 },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        ...chartTooltipStyle,
        valueFormatter: (value: number | string) => `${value} MW`,
      },
      xAxis: {
        type: 'value',
        axisLabel: { ...chartAxisTextStyle, fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(139,163,184,0.1)' } },
      },
      yAxis: {
        type: 'category',
        data: ordered.map((item) => item.name),
        axisLabel: { ...chartAxisTextStyle, fontSize: 10, width: 48, overflow: 'truncate' },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          type: 'bar',
          data: ordered.map((item) => item.value),
          barWidth: 9,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: CHART_COLORS.teal },
                { offset: 1, color: CHART_COLORS.amber },
              ],
            },
            borderRadius: [0, 3, 3, 0],
          },
        },
      ],
    }
  }, [ranks])

  return (
    <ChartCard title="片区能耗">
      <EChart className="h-full min-h-0 w-full" option={option} ariaLabel="片区能耗" />
    </ChartCard>
  )
}
