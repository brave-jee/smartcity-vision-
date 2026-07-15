import { create } from 'zustand'
import type { AiAnalysisResult, AiAnalysisStatus, AiStreamView } from '@/features/ai-events/types'
import type { CityAlert } from '@/features/alerts/types'

type AiEventState = {
  status: AiAnalysisStatus
  alert: CityAlert | null
  result: AiAnalysisResult | null
  stream: AiStreamView
  error: string | null
  /** 任务世代：关闭 / 重开时递增，用于作废进行中的分析 */
  runId: number
  /** 打开面板并进入 loading，返回本次 runId */
  beginAnalysis: (alert: CityAlert) => number
  /** 写入完整结果，进入 streaming */
  enterStreaming: (result: AiAnalysisResult) => void
  /** 更新流式中间态 */
  setStream: (stream: AiStreamView) => void
  setReady: () => void
  setError: (message: string) => void
  closePanel: () => void
}

const emptyStream: AiStreamView = { summary: '', risks: [], actions: [] }

/**
 * AI 事件分析 UI 状态（纯同步）。异步流程由 useAiAnalysis 编排。
 */
export const useAiEventStore = create<AiEventState>((set) => ({
  status: 'idle',
  alert: null,
  result: null,
  stream: emptyStream,
  error: null,
  runId: 0,

  beginAnalysis(alert) {
    let nextRunId = 0
    set((state) => {
      nextRunId = state.runId + 1
      return {
        runId: nextRunId,
        status: 'loading' as const,
        alert,
        result: null,
        stream: emptyStream,
        error: null,
      }
    })
    return nextRunId
  },

  enterStreaming(result) {
    set({ status: 'streaming', result, stream: emptyStream, error: null })
  },

  setStream(stream) {
    set({ stream })
  },

  setReady() {
    set({ status: 'ready' })
  },

  setError(message) {
    set({ status: 'error', error: message })
  },

  closePanel() {
    set((state) => ({
      runId: state.runId + 1,
      status: 'idle',
      alert: null,
      result: null,
      stream: emptyStream,
      error: null,
    }))
  },
}))
