/** 飞线与特效相关类型 */

import type { AlertLevel } from '@/features/alerts/types'

export type FlylineKind = 'ambient' | 'alert'

/** 与告警等级对齐，便于配色联动 */
export type FlylineLevel = AlertLevel

/** 场景中的一条飞线实例 */
export type FlylineInstance = {
  id: string
  kind: FlylineKind
  level: FlylineLevel
  /** 起点世界坐标 */
  from: [number, number, number]
  /** 终点世界坐标 */
  to: [number, number, number]
  /** 拱起高度 */
  arch: number
  /** 光点绕行周期（秒）；确认告警后实例移除 */
  period: number
}
