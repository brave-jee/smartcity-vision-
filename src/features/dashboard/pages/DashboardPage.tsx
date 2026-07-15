import { useMemo } from 'react'
import { AlertStreamBadge } from '@/features/alerts/components/AlertStreamBadge'
import { LiveAlertList } from '@/features/alerts/components/LiveAlertList'
import { useAlertStream } from '@/features/alerts/hooks/useAlertStream'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { ChartsAnalyticsPanel } from '@/features/charts/components/ChartsAnalyticsPanel'
import { MetricList } from '@/features/dashboard/components/MetricList'
import { SceneViewport } from '@/features/dashboard/components/SceneViewport'
import { useDashboardOverview } from '@/features/dashboard/hooks/useDashboardOverview'

/**
 * 首页数据大屏：
 * - 中间三栏固定首屏高度（不随底栏变）
 * - 底部图表在下方，整页可滚轮查看
 */
export function DashboardPage() {
  const { data, loading, error, reload } = useDashboardOverview()
  const { reconnect } = useAlertStream()
  const pendingAlerts = useAlertStore((s) => s.alerts.filter((item) => !item.acknowledged).length)

  const metrics = useMemo(() => {
    if (!data) return null
    return data.metrics.map((metric) => {
      if (metric.id !== 'alarms') return metric
      return {
        ...metric,
        numericValue: pendingAlerts,
        delta: pendingAlerts > 0 ? `待处置 ${pendingAlerts}` : '全部清空',
        trend: pendingAlerts > 0 ? ('up' as const) : ('flat' as const),
      }
    })
  }, [data, pendingAlerts])

  return (
    <main className="flex h-full min-h-0 flex-col overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-base tracking-wide text-city-snow sm:text-lg">
            城市态势总览
          </h1>
          <p className="mt-0.5 text-xs text-city-fog">
            {loading && !data
              ? '正在加载指标…'
              : data
                ? `指标模拟中 · 更新于 ${data.updatedAt}`
                : '等待数据'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AlertStreamBadge onReconnect={reconnect} />
          <button
            type="button"
            onClick={reload}
            className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint active:border-city-mint active:text-city-mint"
          >
            刷新指标
          </button>
        </div>
      </div>

      {error ? (
        <p className="mb-3 shrink-0 text-sm text-city-crimson" role="alert">
          {error}
        </p>
      ) : null}

      {/* 中间区：固定首屏高度，不随底栏或滚动区伸缩 */}
      <div className="grid h-[calc(100dvh-10rem)] min-h-[480px] shrink-0 grid-cols-1 items-stretch gap-3 lg:grid-cols-[240px_minmax(0,1fr)_260px] xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <aside className="order-2 flex h-full min-h-0 flex-col overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4 lg:order-1">
          <p className="mb-4 shrink-0 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
            Key Metrics
          </p>
          <div className="min-h-0 flex-1">
            {metrics ? (
              <MetricList metrics={metrics} />
            ) : (
              <p className="text-sm text-city-fog">指标加载中…</p>
            )}
          </div>
        </aside>

        <section className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-0">
          <div className="absolute inset-0">
            <SceneViewport />
          </div>
        </section>

        <aside className="order-3 flex h-full min-h-0 flex-col overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4">
          <p className="mb-4 shrink-0 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
            Live Alerts
          </p>
          <div className="min-h-0 flex-1">
            <LiveAlertList />
          </div>
        </aside>
      </div>

      {/* 底栏加高；滚轮下翻即可看到 */}
      <div className="mt-3 mb-2 h-[250px] shrink-0 lg:h-[270px]">
        {data ? (
          <ChartsAnalyticsPanel trafficTrend={data.trafficTrend} energyTrend={data.energyTrend} />
        ) : (
          <section className="flex h-full items-center border border-city-fog/15 bg-city-panel/20 px-3 text-xs text-city-fog">
            统计图表加载中…
          </section>
        )}
      </div>
    </main>
  )
}
