import type { TrendPoint } from '@/features/dashboard/types'

/** 片区能耗排行（Mock） */
export type DistrictEnergyRank = {
  name: string
  value: number
}

/**
 * 由趋势点 + 抖动生成片区排行，保证刷新后有轻微变化。
 */
export function buildDistrictEnergyRanks(seedPoints: TrendPoint[]): DistrictEnergyRank[] {
  const names = ['东城供区', '滨江走廊', '星港商圈', '数创园区', '合院商街', '南区生态']
  const base = seedPoints.reduce((sum, p) => sum + p.value, 0) / Math.max(seedPoints.length, 1)

  return names.map((name, index) => {
    const wobble = ((index * 17) % 9) - 4
    return {
      name,
      value: Math.max(12, Math.round(base * (0.72 + index * 0.06) + wobble)),
    }
  })
}
