/** 建筑详情相关类型 */

export type BuildingStatus = 'normal' | 'warning' | 'critical'

/** 选中建筑后展示的详情卡片数据 */
export type BuildingDetail = {
  id: string
  name: string
  /** 所属片区 */
  district: string
  /** 楼层数 */
  floors: number
  /** 实时能耗（MW） */
  energyMw: number
  /** 入住率 0-100 */
  occupancy: number
  /** 运行状态 */
  status: BuildingStatus
  /** 一句话摘要 */
  summary: string
  /** 世界坐标，供相机聚焦 */
  position: [number, number, number]
}
