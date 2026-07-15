import type { BuildingType } from '@/features/scene3d/constants'

/** GLTF 城市地块放置信息 */
export type GltfPlot = {
  id: string
  name: string
  type: BuildingType
  x: number
  z: number
  rotationY: number
  scale: number
}

/**
 * 简易伪随机，保证街区每次刷新布局稳定。
 */
function createSeededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

const TYPES: BuildingType[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const NAMES = [
  '云栖中心',
  '滨江塔',
  '科创大厦',
  '市政中枢',
  '星港广场',
  '数创园区',
  '智慧展馆',
  '合院商街',
]

/**
 * 生成 GLTF 建筑排布（十字主干道两侧街区）。
 */
export function createGltfCityPlots(): GltfPlot[] {
  const random = createSeededRandom(88_021)
  const plots: GltfPlot[] = []
  let index = 0

  for (let row = -3; row <= 3; row += 1) {
    for (let col = -3; col <= 3; col += 1) {
      // 留出十字路口与主干道空隙
      if (Math.abs(row) === 0 || Math.abs(col) === 0) continue

      const type = TYPES[Math.floor(random() * TYPES.length)]
      plots.push({
        id: `gltf-${index}`,
        name: NAMES[index % NAMES.length],
        type,
        x: col * 6.2,
        z: row * 6.2,
        rotationY: Math.floor(random() * 4) * (Math.PI / 2),
        scale: 2.4 + random() * 0.6,
      })
      index += 1
    }
  }

  return plots
}

export const GLTF_CITY_PLOTS = createGltfCityPlots()
