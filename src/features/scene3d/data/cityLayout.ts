import type { CityBuilding } from '@/features/scene3d/types'

/**
 * 简易伪随机：保证城市场景布局在刷新后保持稳定。
 */
function createSeededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

/**
 * 生成夜景城市建筑布局（程序化，非外部 GLTF）。
 */
export function createCityLayout(): CityBuilding[] {
  const random = createSeededRandom(20260715)
  const buildings: CityBuilding[] = []
  const names = ['云栖中心', '滨江塔', '科创大厦', '市政中枢', '星港广场', '数创园区']

  let index = 0
  for (let row = -5; row <= 5; row += 1) {
    for (let col = -5; col <= 5; col += 1) {
      // 中心十字路口留空
      if (Math.abs(row) + Math.abs(col) <= 1) continue

      const dist = Math.hypot(row, col)
      const isLandmark = dist <= 2.5 && random() > 0.55
      const width = isLandmark ? 2.4 + random() * 1.2 : 1.5 + random() * 1.6
      const depth = isLandmark ? 2.2 + random() * 1.2 : 1.5 + random() * 1.6
      const height = isLandmark ? 12 + random() * 10 : 3 + random() * 8
      const gapX = 3.6
      const gapZ = 3.6

      buildings.push({
        id: `b-${index}`,
        x: col * gapX + (random() - 0.5) * 0.35,
        z: row * gapZ + (random() - 0.5) * 0.35,
        width,
        depth,
        height,
        name: isLandmark ? names[index % names.length] : `街区单元 ${index + 1}`,
        facadeStyle: Math.floor(random() * 4),
        isLandmark,
      })
      index += 1
    }
  }

  return buildings
}

/** 模块加载时生成一次，避免每次渲染抖动布局 */
export const CITY_BUILDINGS = createCityLayout()
