import { GLTF_CITY_PLOTS } from '@/features/scene3d/data/gltfCityLayout'
import type { BuildingDetail, BuildingStatus } from '@/features/scene3d/types/buildingDetail'

const DISTRICTS = ['东城', '滨江', '南区', '科创园']

/**
 * 基于地块稳定生成 Mock 详情（同 id 结果固定）。
 */
function hashId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return hash
}

function statusFromHash(value: number): BuildingStatus {
  const mod = value % 10
  if (mod >= 8) return 'critical'
  if (mod >= 5) return 'warning'
  return 'normal'
}

/** 预生成全部建筑详情表，供点击面板快速读取 */
export const BUILDING_DETAILS: Record<string, BuildingDetail> = Object.fromEntries(
  GLTF_CITY_PLOTS.map((plot) => {
    const hash = hashId(plot.id)
    const status = statusFromHash(hash)
    const floors = 8 + (hash % 28)
    const energyMw = Number((1.2 + (hash % 90) / 20).toFixed(1))
    const occupancy = 55 + (hash % 40)

    const summaries: Record<BuildingStatus, string> = {
      normal: '运行指标正常，暂无紧急事件。',
      warning: '能耗偏高，建议关注空调与照明负荷。',
      critical: '存在超限告警，请优先核查电力回路。',
    }

    const detail: BuildingDetail = {
      id: plot.id,
      name: plot.name,
      district: DISTRICTS[hash % DISTRICTS.length],
      floors,
      energyMw,
      occupancy,
      status,
      summary: summaries[status],
      position: [plot.x, 0, plot.z],
    }

    return [plot.id, detail]
  }),
)

/** 按 id 查询建筑详情 */
export function getBuildingDetail(id: string | null): BuildingDetail | null {
  if (!id) return null
  return BUILDING_DETAILS[id] ?? null
}
