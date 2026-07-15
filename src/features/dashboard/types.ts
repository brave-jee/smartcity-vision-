/** 首页数据大屏相关类型定义 */

/** KPI 指标项 */
export type DashboardMetric = {
  id: string
  /** 指标名称 */
  label: string
  /** 用于滚动动画的原始数值 */
  numericValue: number
  /** 小数位数（能耗等） */
  decimals?: number
  /** 数值后缀，如 MW、% */
  suffix?: string
  /** 是否使用千分位 */
  useGrouping?: boolean
  /** 同比/环比变化文案，如 +2.4% */
  delta: string
  /** 变化方向，用于配色 */
  trend: 'up' | 'down' | 'flat'
}

/** 右侧告警预览项（完整实时告警在后续 WebSocket 模块） */
export type DashboardAlertPreview = {
  id: string
  level: 'info' | 'warning' | 'critical'
  title: string
  time: string
}

/** 简易趋势点（本模块用 CSS/SVG 展示，ECharts 留给统计图表模块） */
export type TrendPoint = {
  label: string
  value: number
}

/** 大屏总览数据 */
export type DashboardOverview = {
  metrics: DashboardMetric[]
  alerts: DashboardAlertPreview[]
  trafficTrend: TrendPoint[]
  energyTrend: TrendPoint[]
  updatedAt: string
}
