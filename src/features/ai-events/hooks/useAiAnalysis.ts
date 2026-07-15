import { analyzeAlertApi } from '@/features/ai-events/api/analyzeAlertApi'
import { useAiEventStore } from '@/features/ai-events/stores/useAiEventStore'
import { playAnalysisStream } from '@/features/ai-events/utils/playAnalysisStream'
import type { CityAlert } from '@/features/alerts/types'

/** 多处组件共用 hook 时，共用同一取消令牌 */
let activeAbort: AbortController | null = null

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError'
}

function abortActiveRequest() {
  activeAbort?.abort()
  activeAbort = null
}

/**
 * 编排 AI 分析：调用 Mock API → 流式写入 store。
 * 组件只订阅 store 展示，业务副作用集中在此 hook。
 */
export function useAiAnalysis() {
  const status = useAiEventStore((s) => s.status)
  const alert = useAiEventStore((s) => s.alert)
  const result = useAiEventStore((s) => s.result)
  const stream = useAiEventStore((s) => s.stream)
  const error = useAiEventStore((s) => s.error)
  const beginAnalysis = useAiEventStore((s) => s.beginAnalysis)
  const enterStreaming = useAiEventStore((s) => s.enterStreaming)
  const setStream = useAiEventStore((s) => s.setStream)
  const setReady = useAiEventStore((s) => s.setReady)
  const setError = useAiEventStore((s) => s.setError)
  const closePanelStore = useAiEventStore((s) => s.closePanel)

  async function analyzeAlert(target: CityAlert) {
    abortActiveRequest()
    const controller = new AbortController()
    activeAbort = controller

    const runId = beginAnalysis(target)

    try {
      const next = await analyzeAlertApi(target, controller.signal)
      if (useAiEventStore.getState().runId !== runId) return

      enterStreaming(next)
      await playAnalysisStream(next, {
        isActive: () => useAiEventStore.getState().runId === runId,
        onUpdate: setStream,
      })

      if (useAiEventStore.getState().runId !== runId) return
      setReady()
    } catch (err) {
      if (isAbortError(err) || useAiEventStore.getState().runId !== runId) return
      setError(err instanceof Error ? err.message : '分析失败')
    } finally {
      if (activeAbort === controller) {
        activeAbort = null
      }
    }
  }

  function closePanel() {
    abortActiveRequest()
    closePanelStore()
  }

  return {
    status,
    alert,
    result,
    stream,
    error,
    analyzeAlert,
    closePanel,
  }
}
