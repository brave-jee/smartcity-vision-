import { GLTF_CITY_PLOTS } from '@/features/scene3d/data/gltfCityLayout'

/** 片区名 → 近似落点（与建筑/道路约定对齐） */
const DISTRICT_TARGETS: Record<string, [number, number, number]> = {
  东城供区: [12.4, 3.2, 6.2],
  中央枢纽: [0, 2.5, 0],
  滨江走廊: [18, 1.2, 1.2],
  // 告警文案为「星港商圈」，建筑名为「星港广场」
  星港商圈: findPlot('星港广场') ?? [-12.4, 3.5, -6.2],
  滨江塔: findPlot('滨江塔') ?? [-6.2, 4, 6.2],
  南区生态: [6.2, 2.8, 12.4],
  合院商街: findPlot('合院商街') ?? [-18.6, 2.5, -12.4],
  数创园区: findPlot('数创园区') ?? [12.4, 3, -12.4],
  智慧展馆: findPlot('智慧展馆') ?? [18.6, 3.2, -6.2],
}

function findPlot(name: string): [number, number, number] | null {
  const plot = GLTF_CITY_PLOTS.find((item) => item.name === name)
  if (!plot) return null
  return [plot.x, 3.2, plot.z]
}

/**
 * 将告警片区映射到场景坐标；未知片区则稳定散列到某栋建筑。
 */
export function resolveDistrictTarget(district: string): [number, number, number] {
  const known = DISTRICT_TARGETS[district]
  if (known) return known

  let hash = 0
  for (let i = 0; i < district.length; i += 1) {
    hash = (hash * 31 + district.charCodeAt(i)) >>> 0
  }
  const plot = GLTF_CITY_PLOTS[hash % GLTF_CITY_PLOTS.length]
  if (!plot) return [6, 3, 6]
  return [plot.x, 3.2, plot.z]
}

/** 氛围飞线落点：指挥中枢 → 若干地标 */
export function buildAmbientTargets(): Array<[number, number, number]> {
  const picks = [0, 3, 7, 11, 15, 20].map((index) => {
    const plot = GLTF_CITY_PLOTS[index % GLTF_CITY_PLOTS.length]!
    return [plot.x, 3.4 + (index % 3) * 0.4, plot.z] as [number, number, number]
  })
  return picks
}
