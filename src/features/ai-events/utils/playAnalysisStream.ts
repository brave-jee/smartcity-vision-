import {
  AI_STREAM_CHUNK_MS,
  AI_STREAM_CHUNK_SIZE,
  AI_STREAM_ITEM_MS,
} from '@/features/ai-events/constants'
import type { AiAnalysisResult, AiStreamView } from '@/features/ai-events/types'

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

type StreamOptions = {
  /** 仍为当前任务则继续写 UI */
  isActive: () => boolean
  onUpdate: (view: AiStreamView) => void
}

/**
 * 将分析结果按批次推到 UI：摘要分片打字，再逐条风险 / 建议。
 */
export async function playAnalysisStream(result: AiAnalysisResult, options: StreamOptions) {
  const { isActive, onUpdate } = options
  let summary = ''

  for (let i = 0; i < result.summary.length; i += AI_STREAM_CHUNK_SIZE) {
    if (!isActive()) return
    summary = result.summary.slice(0, Math.min(i + AI_STREAM_CHUNK_SIZE, result.summary.length))
    onUpdate({ summary, risks: [], actions: [] })
    await delay(AI_STREAM_CHUNK_MS)
  }

  const risks: string[] = []
  for (const item of result.risks) {
    if (!isActive()) return
    risks.push(item)
    onUpdate({ summary, risks: [...risks], actions: [] })
    await delay(AI_STREAM_ITEM_MS)
  }

  const actions: string[] = []
  for (const item of result.actions) {
    if (!isActive()) return
    actions.push(item)
    onUpdate({ summary, risks: [...risks], actions: [...actions] })
    await delay(AI_STREAM_ITEM_MS)
  }
}
