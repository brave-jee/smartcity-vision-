import type { DashboardOverview, TrendPoint } from '@/features/dashboard/types'

/** 在基准值附近产生抖动，模拟实时流 */
function jitterAround(base: number, span: number) {
  return base + (Math.random() - 0.5) * span
}

/** 生成带实时抖动的趋势序列 */
function buildTrend(base: number[]): TrendPoint[] {
  const labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
  return labels.map((label, index) => ({
    label,
    value: Math.max(8, Math.round(jitterAround(base[index] ?? 50, 10))),
  }))
}

/**
 * 生成带轻微抖动的模拟总览数据。
 * 告警列表改由 WebSocket 模块推送，此处只保留 KPI 占位。
 */
function buildMockOverview(): DashboardOverview {
  const population = Math.round(jitterAround(12840, 180))
  const energy = jitterAround(86.5, 2.4)
  const traffic = Math.min(99, Math.max(40, Math.round(jitterAround(72, 8))))

  return {
    metrics: [
      {
        id: 'population',
        label: '实时人流',
        numericValue: population,
        useGrouping: true,
        delta: population >= 12840 ? '+1.8%' : '+0.9%',
        trend: population >= 12800 ? 'up' : 'flat',
      },
      {
        id: 'energy',
        label: '区域能耗',
        numericValue: energy,
        decimals: 1,
        suffix: ' MW',
        delta: energy > 86.5 ? '+0.3%' : '-0.6%',
        trend: energy > 86.5 ? 'up' : 'down',
      },
      {
        id: 'traffic',
        label: '路网畅通',
        numericValue: traffic,
        suffix: '%',
        delta: traffic >= 72 ? '+0.4%' : '-0.5%',
        trend: traffic >= 72 ? 'up' : 'down',
      },
      {
        id: 'alarms',
        label: '待处置告警',
        // 展示值由实时告警 store 覆盖
        numericValue: 0,
        delta: '实时',
        trend: 'flat',
      },
    ],
    trafficTrend: buildTrend([48, 62, 71, 66, 78, 84, 69]),
    energyTrend: buildTrend([52, 58, 74, 70, 81, 88, 76]),
    updatedAt: Date.now(),
  }
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/** 拉取大屏总览（当前为前端 Mock） */
export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  await delay(120)
  return buildMockOverview()
}
