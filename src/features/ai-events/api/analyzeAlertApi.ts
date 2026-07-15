import { AI_THINK_DELAY_MS } from '@/features/ai-events/constants'
import { buildMockAnalysis } from '@/features/ai-events/data/analysisTemplates'
import type { AiAnalysisResult } from '@/features/ai-events/types'
import type { CityAlert } from '@/features/alerts/types'

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const timer = window.setTimeout(() => {
      resolve()
    }, ms)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

function thinkDelayMs() {
  const span = AI_THINK_DELAY_MS.max - AI_THINK_DELAY_MS.min
  return AI_THINK_DELAY_MS.min + Math.floor(Math.random() * span)
}

/**
 * Mock：POST /api/ai/analyze { alertId }
 * 延迟后返回结构化摘要 / 风险 / 建议，便于日后换成真实模型接口。
 */
export async function analyzeAlertApi(
  alert: CityAlert,
  signal?: AbortSignal,
): Promise<AiAnalysisResult> {
  await delay(thinkDelayMs(), signal)
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }
  return buildMockAnalysis(alert)
}
