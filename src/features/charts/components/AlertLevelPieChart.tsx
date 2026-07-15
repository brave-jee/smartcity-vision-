import { useMemo } from 'react'
import type { EChartsCoreOption } from 'echarts/core'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { ChartCard } from '@/features/charts/components/ChartCard'
import { EChart } from '@/features/charts/components/EChart'
import { CHART_COLORS, chartTooltipStyle } from '@/features/charts/theme'

export function AlertLevelPieChart() {
  const alerts = useAlertStore((s) => s.alerts)

  const counts = useMemo(() => {
    const next = { critical: 0, warning: 0, info: 0 }
    for (const alert of alerts) {
      next[alert.level] += 1
    }
    return next
  }, [alerts])

  const total = counts.critical + counts.warning + counts.info

  const option = useMemo<EChartsCoreOption>(() => {
    const data = [
      { name: '严重', value: counts.critical, itemStyle: { color: CHART_COLORS.crimson } },
      { name: '警告', value: counts.warning, itemStyle: { color: CHART_COLORS.amber } },
      { name: '提示', value: counts.info, itemStyle: { color: CHART_COLORS.mint } },
    ]

    return {
      animationDuration: 400,
      tooltip: { trigger: 'item', ...chartTooltipStyle, formatter: '{b}: {c} ({d}%)' },
      legend: {
        bottom: 0,
        textStyle: { color: CHART_COLORS.fog, fontSize: 10 },
        itemWidth: 8,
        itemHeight: 8,
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '68%'],
          center: ['50%', '42%'],
          label: { show: false },
          data:
            total === 0 ? [{ name: '等待推送', value: 1, itemStyle: { color: '#2a3a4c' } }] : data,
        },
      ],
    }
  }, [counts, total])

  const title = total > 0 ? `告警分布 (${total})` : '告警分布'

  return (
    <ChartCard title={title}>
      <EChart className="h-full min-h-0 w-full" option={option} ariaLabel={title} />
    </ChartCard>
  )
}
