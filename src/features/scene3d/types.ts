/** 3D 城市场景相关类型 */

/** 单栋建筑的空间与展示数据 */
export type CityBuilding = {
  id: string
  /** 世界坐标 X（水平） */
  x: number
  /** 世界坐标 Z（深度） */
  z: number
  /** 建筑宽度 */
  width: number
  /** 建筑深度 */
  depth: number
  /** 建筑高度 */
  height: number
  /** 名称（供下一模块点击详情使用） */
  name: string
  /** 立面纹理样式编号 */
  facadeStyle: number
  /** 是否为地标高层 */
  isLandmark: boolean
}
