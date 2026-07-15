import { useMemo } from 'react'
import { AlertStreamBadge } from '@/features/alerts/components/AlertStreamBadge'
import { LiveAlertList } from '@/features/alerts/components/LiveAlertList'
import { useAlertStream } from '@/features/alerts/hooks/useAlertStream'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { MetricList } from '@/features/dashboard/components/MetricList'
import { SceneViewport } from '@/features/dashboard/components/SceneViewport'
import { TrendBars } from '@/features/dashboard/components/TrendBars'
import { useDashboardOverview } from '@/features/dashboard/hooks/useDashboardOverview'

/**
 * 首页数据大屏：
 * - 桌面：左指标 / 中场景 / 右实时告警
 * - 移动：场景在上，指标与告警纵向排布
 */
export function DashboardPage() {
  const { data, loading, error, reload } = useDashboardOverview()
  const { reconnect } = useAlertStream()
  const pendingAlerts = useAlertStore((s) => s.alerts.filter((item) => !item.acknowledged).length)

  // 将「待处置告警」KPI 与 WebSocket 待确认数对齐
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
    <main className="flex h-full min-h-0 flex-col px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
      {/* 顶栏信息：更新时间、告警角标与手动刷新 */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
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
        <p className="mb-3 text-sm text-city-crimson" role="alert">
          {error}
        </p>
      ) : null}

      {/* 三栏大屏壳 */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[240px_minmax(0,1fr)_260px] xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        {/* 左栏：KPI + 交通趋势 */}
        <aside className="order-2 flex min-h-0 flex-col gap-6 overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4 lg:order-1">
          <section>
            <p className="mb-4 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
              Key Metrics
            </p>
            {metrics ? (
              <MetricList metrics={metrics} />
            ) : (
              <p className="text-sm text-city-fog">指标加载中…</p>
            )}
          </section>
          <section>
            {data ? <TrendBars title="路网通行趋势" points={data.trafficTrend} /> : null}
          </section>
        </aside>

        {/* 中栏：3D 场景视口 */}
        <section className="order-1 min-h-[240px] lg:order-2 lg:min-h-0">
          <SceneViewport />
        </section>

        {/* 右栏：实时告警 + 能耗趋势 */}
        <aside className="order-3 flex min-h-0 flex-col gap-6 overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4">
          <section>
            <p className="mb-4 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
              Live Alerts
            </p>
            <LiveAlertList />
          </section>
          <section>
            {data ? <TrendBars title="能耗负荷趋势" points={data.energyTrend} /> : null}
          </section>
        </aside>
      </div>
    </main>
  )
}
