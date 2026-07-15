/** 图表模块配色（与大屏 CSS token 对齐） */
export const CHART_COLORS = {
  mint: '#5ec4b6',
  teal: '#3d9b8f',
  amber: '#e8a54b',
  crimson: '#d64545',
  fog: '#8ba3b8',
  snow: '#e8f0f5',
  panel: '#0f1f33',
  ink: '#071018',
} as const

/** 通用坐标轴 / 提示框样式 */
export const chartAxisTextStyle = {
  color: CHART_COLORS.fog,
  fontSize: 10,
}

export const chartTooltipStyle = {
  backgroundColor: 'rgba(7, 16, 24, 0.92)',
  borderColor: 'rgba(139, 163, 184, 0.25)',
  textStyle: {
    color: CHART_COLORS.snow,
    fontSize: 12,
  },
}
