/** 巡航车辆相关类型 */

export type PatrolRouteId = 'ring-ew' | 'ring-ns'

export type PatrolVehicleConfig = {
  id: string
  /** 车身颜色 */
  color: string
  /** 所属闭环路径 */
  routeId: PatrolRouteId
  /** 沿路径初始进度 0–1 */
  startProgress: number
  /** 速度系数（越大越快） */
  speed: number
}
