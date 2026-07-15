/** GLTF 城市资源路径（KayKit City Builder Bits，CC0） */

export const CITY_MODEL_BASE = '/models/city/gltf'

/** 可用建筑型号 */
export const BUILDING_TYPES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const

export type BuildingType = (typeof BUILDING_TYPES)[number]

export function buildingModelPath(type: BuildingType) {
  return `${CITY_MODEL_BASE}/building_${type}.gltf`
}
