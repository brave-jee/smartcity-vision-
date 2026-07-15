import { useMemo } from 'react'
import type { EChartsCoreOption } from 'echarts/core'
import { ChartCard } from '@/features/charts/components/ChartCard'
import { EChart } from '@/features/charts/components/EChart'
import { CHART_COLORS, chartAxisTextStyle, chartTooltipStyle } from '@/features/charts/theme'
import type { TrendPoint } from '@/features/dashboard/types'

type EnergyTrendChartProps = {
  energyPoints: TrendPoint[]
  trafficPoints: TrendPoint[]
}

export function EnergyTrendChart({ energyPoints, trafficPoints }: EnergyTrendChartProps) {
  const option = useMemo<EChartsCoreOption>(() => {
    return {
      animationDuration: 400,
      legend: {
        top: 0,
        right: 0,
        textStyle: { color: CHART_COLORS.fog, fontSize: 10 },
        itemWidth: 10,
        itemHeight: 4,
      },
      grid: { left: 30, right: 8, top: 22, bottom: 22 },
      tooltip: { trigger: 'axis', ...chartTooltipStyle },
      xAxis: {
        type: 'category',
        data: energyPoints.map((p) => p.label),
        boundaryGap: false,
        axisLabel: { ...chartAxisTextStyle, fontSize: 10 },
        axisLine: { lineStyle: { color: 'rgba(139,163,184,0.25)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        splitNumber: 2,
        axisLabel: { ...chartAxisTextStyle, fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(139,163,184,0.1)' } },
      },
      series: [
        {
          name: '能耗',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: energyPoints.map((p) => p.value),
          lineStyle: { width: 2, color: CHART_COLORS.amber },
        },
        {
          name: '通行',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: trafficPoints.map((p) => p.value),
          lineStyle: { width: 1.8, color: CHART_COLORS.mint, type: 'dashed' },
        },
      ],
    }
  }, [energyPoints, trafficPoints])

  return (
    <ChartCard title="能耗对比">
      <EChart className="h-full min-h-0 w-full" option={option} ariaLabel="能耗对比" />
    </ChartCard>
  )
}
