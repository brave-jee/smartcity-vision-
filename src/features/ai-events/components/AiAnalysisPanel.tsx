import { useAiAnalysis } from '@/features/ai-events/hooks/useAiAnalysis'
import { alertLevelDotClass, alertLevelLabel } from '@/features/alerts/utils/formatAlert'

function confidenceLabel(value: number) {
  return `${Math.round(value * 100)}%`
}

/**
 * 场景内 AI 分析浮层：选中告警后模拟流式输出摘要 / 风险 / 建议。
 */
export function AiAnalysisPanel() {
  const { status, alert, result, stream, error, analyzeAlert, closePanel } = useAiAnalysis()

  if (status === 'idle' || !alert) return null

  const isBusy = status === 'loading' || status === 'streaming'
  const showCaret =
    status === 'streaming' && !!result && stream.summary.length < result.summary.length

  return (
    <aside className="pointer-events-auto absolute top-14 left-3 z-20 flex max-h-[min(62%,26rem)] w-[min(100%-1.5rem,20rem)] flex-col border border-city-fog/25 bg-city-panel/95 p-4 backdrop-blur-sm sm:w-[22rem]">
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div>
          <p className="font-display text-[10px] tracking-[0.2em] text-city-mint uppercase">
            AI Event Analysis
          </p>
          <p className="mt-1 text-[10px] text-city-fog">模拟推理 · 非真实模型</p>
        </div>
        <button
          type="button"
          onClick={closePanel}
          className="text-xs text-city-fog transition hover:text-city-mint"
        >
          关闭
        </button>
      </div>

      <div className="mt-3 flex shrink-0 items-start gap-2 border-b border-city-fog/15 pb-3">
        <span
          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${alertLevelDotClass(alert.level)}`}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-city-snow">{alert.title}</p>
          <p className="mt-1 truncate text-xs text-city-fog">
            {alert.district} · {alertLevelLabel(alert.level)}
          </p>
        </div>
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        {status === 'loading' ? (
          <div className="flex items-center gap-2 text-sm text-city-fog">
            <span
              className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-city-fog/30 border-t-city-mint"
              aria-hidden
            />
            正在汇聚多源信号…
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="space-y-3">
            <p className="text-sm text-city-crimson" role="alert">
              {error ?? '分析失败'}
            </p>
            <button
              type="button"
              onClick={() => {
                void analyzeAlert(alert)
              }}
              className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint"
            >
              重试
            </button>
          </div>
        ) : null}

        {status === 'streaming' || status === 'ready' ? (
          <div className="space-y-4">
            <section>
              <p className="font-display text-[10px] tracking-[0.18em] text-city-mint uppercase">
                摘要
              </p>
              <p className="mt-2 text-sm leading-relaxed text-city-snow">
                {stream.summary}
                {showCaret ? (
                  <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-city-mint align-middle" />
                ) : null}
              </p>
            </section>

            {stream.risks.length > 0 ? (
              <section>
                <p className="font-display text-[10px] tracking-[0.18em] text-city-amber uppercase">
                  风险研判
                </p>
                <ul className="mt-2 space-y-1.5">
                  {stream.risks.map((item, index) => (
                    <li
                      key={`${index}-${item.slice(0, 12)}`}
                      className="flex gap-2 text-xs leading-relaxed text-city-fog"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-city-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {stream.actions.length > 0 ? (
              <section>
                <p className="font-display text-[10px] tracking-[0.18em] text-city-mint uppercase">
                  处置建议
                </p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-city-fog">
                  {stream.actions.map((item, index) => (
                    <li key={`${index}-${item.slice(0, 12)}`}>{item}</li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>

      {result && (status === 'streaming' || status === 'ready') ? (
        <div className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-city-fog/15 pt-3 text-[10px] text-city-fog">
          <span>
            {result.model} · 置信度 {confidenceLabel(result.confidence)}
          </span>
          <button
            type="button"
            disabled={isBusy}
            onClick={() => {
              void analyzeAlert(alert)
            }}
            className="text-city-mint transition hover:text-city-snow disabled:opacity-40"
          >
            重新分析
          </button>
        </div>
      ) : null}
    </aside>
  )
}
