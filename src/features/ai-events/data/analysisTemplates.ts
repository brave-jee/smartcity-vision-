import type { AlertLevel, CityAlert } from '@/features/alerts/types'
import { AI_MODEL_NAME } from '@/features/ai-events/constants'
import type { AiAnalysisResult } from '@/features/ai-events/types'

type Template = {
  summary: (alert: CityAlert) => string
  risks: (alert: CityAlert) => string[]
  actions: (alert: CityAlert) => string[]
  confidence: number
}

const BY_LEVEL: Record<AlertLevel, Template> = {
  critical: {
    confidence: 0.91,
    summary: (a) =>
      `综合电力、客流与安防多源信号，判定「${a.title}」属于高优先级联动事件。当前集中在${a.district}，若 15 分钟内未处置，存在向周边片区扩散的风险。`,
    risks: (a) => [
      `${a.district}核心设施负荷可能继续攀升`,
      '周边路网与枢纽人流产生连锁拥堵',
      '若处置滞后，应急资源调度窗口将收窄',
    ],
    actions: (a) => [
      `立即启动 ${a.source} 二级响应，锁定现场监测源`,
      '调度最近巡检单元抵近复核，并同步指挥大厅',
      '暂时限流相邻出入口，预留应急通道',
      '完成后回传处置结果，供下一轮态势复盘',
    ],
  },
  warning: {
    confidence: 0.84,
    summary: (a) =>
      `针对「${a.title}」，模拟模型识别到${a.district}短期异常波动，尚未达到危急阈值，但趋势需持续跟踪。建议在 30 分钟窗口内完成现场核验。`,
    risks: (a) => [
      `${a.district}局部指标可能快速转危`,
      '若叠加高峰时段，响应压力将上升',
      '多源误报叠加可能干扰指挥判断',
    ],
    actions: (a) => [
      `由 ${a.source} 值班席发起远程复核`,
      '安排最近车辆/巡逻单元途经观察',
      '将事件挂入待办队列，超时自动升级提醒',
    ],
  },
  info: {
    confidence: 0.78,
    summary: (a) =>
      `「${a.title}」当前为提示级事件，${a.district}运行总体平稳。可作为态势留痕与运维回访线索，无需占用紧急处置通道。`,
    risks: () => ['影响面有限，但仍建议纳入日常巡检记录'],
    actions: (a) => [
      `归档至运维日志，标记来源 ${a.source}`,
      '若同类提示 1 小时内重复出现，再触发加深分析',
    ],
  },
}

/**
 * 按告警等级套用模板，生成结构化模拟分析结果。
 */
export function buildMockAnalysis(alert: CityAlert): AiAnalysisResult {
  const tpl = BY_LEVEL[alert.level]
  return {
    alertId: alert.id,
    model: AI_MODEL_NAME,
    confidence: tpl.confidence,
    summary: tpl.summary(alert),
    risks: tpl.risks(alert),
    actions: tpl.actions(alert),
    generatedAt: Date.now(),
    level: alert.level,
    title: alert.title,
    district: alert.district,
  }
}
