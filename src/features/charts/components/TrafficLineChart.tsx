import { useMemo } from 'react'
import type { EChartsCoreOption } from 'echarts/core'
import { ChartCard } from '@/features/charts/components/ChartCard'
import { EChart } from '@/features/charts/components/EChart'
import { CHART_COLORS, chartAxisTextStyle, chartTooltipStyle } from '@/features/charts/theme'
import type { TrendPoint } from '@/features/dashboard/types'

type TrafficLineChartProps = {
  points: TrendPoint[]
}

export function TrafficLineChart({ points }: TrafficLineChartProps) {
  const option = useMemo<EChartsCoreOption>(() => {
    return {
      animationDuration: 400,
      grid: { left: 30, right: 8, top: 10, bottom: 22 },
      tooltip: { trigger: 'axis', ...chartTooltipStyle },
      xAxis: {
        type: 'category',
        data: points.map((p) => p.label),
        boundaryGap: false,
        axisLabel: { ...chartAxisTextStyle, fontSize: 10 },
        axisLine: { lineStyle: { color: 'rgba(139,163,184,0.25)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitNumber: 2,
        axisLabel: { ...chartAxisTextStyle, fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(139,163,184,0.1)' } },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          data: points.map((p) => p.value),
          lineStyle: { width: 2, color: CHART_COLORS.mint },
          itemStyle: { color: CHART_COLORS.mint },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(94,196,182,0.35)' },
                { offset: 1, color: 'rgba(94,196,182,0.02)' },
              ],
            },
          },
        },
      ],
    }
  }, [points])

  return (
    <ChartCard title="路网通行">
      <EChart className="h-full min-h-0 w-full" option={option} ariaLabel="路网通行" />
    </ChartCard>
  )
}
