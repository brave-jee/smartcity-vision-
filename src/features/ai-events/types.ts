import type { AlertLevel } from '@/features/alerts/types'

/** 模拟 AI 分析任务状态 */
export type AiAnalysisStatus = 'idle' | 'loading' | 'streaming' | 'ready' | 'error'

/** 结构化 AI 分析结果（对应 POST /api/ai/analyze） */
export type AiAnalysisResult = {
  alertId: string
  /** 演示用模型名 */
  model: string
  /** 置信度 0–1 */
  confidence: number
  summary: string
  risks: string[]
  actions: string[]
  generatedAt: number
  /** 告警等级快照，便于 UI 着色 */
  level: AlertLevel
  title: string
  district: string
}

/** 流式展示过程中的局部文本 */
export type AiStreamView = {
  summary: string
  risks: string[]
  actions: string[]
}
