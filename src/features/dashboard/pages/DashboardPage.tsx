import { AlertPreviewList } from '@/features/dashboard/components/AlertPreviewList'
import { MetricList } from '@/features/dashboard/components/MetricList'
import { SceneViewport } from '@/features/dashboard/components/SceneViewport'
import { TrendBars } from '@/features/dashboard/components/TrendBars'
import { useDashboardOverview } from '@/features/dashboard/hooks/useDashboardOverview'

/**
 * 首页数据大屏：
 * - 桌面：左指标 / 中场景占位 / 右告警
 * - 移动：场景在上，指标与告警纵向排布
 */
export function DashboardPage() {
  const { data, loading, error, reload } = useDashboardOverview()

  return (
    <main className="flex h-full min-h-0 flex-col px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
      {/* 顶栏信息：更新时间与手动刷新 */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-base tracking-wide text-city-snow sm:text-lg">
            城市态势总览
          </h1>
          <p className="mt-0.5 text-xs text-city-fog">
            {loading && !data
              ? '正在加载指标…'
              : data
                ? `实时模拟中 · 更新于 ${data.updatedAt}`
                : '等待数据'}
          </p>
        </div>
        <button
          type="button"
          onClick={reload}
          className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint active:border-city-mint active:text-city-mint"
        >
          刷新
        </button>
      </div>

      {error ? (
        <p className="mb-3 text-sm text-city-crimson" role="alert">
          {error}
        </p>
      ) : null}

      {/* 三栏大屏壳：中央为 3D 预留区 */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[240px_minmax(0,1fr)_260px] xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        {/* 左栏：KPI + 交通趋势 */}
        <aside className="order-2 flex min-h-0 flex-col gap-6 overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4 lg:order-1">
          <section>
            <p className="mb-4 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
              Key Metrics
            </p>
            {data ? (
              <MetricList metrics={data.metrics} />
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

        {/* 右栏：告警预览 + 能耗趋势 */}
        <aside className="order-3 flex min-h-0 flex-col gap-6 overflow-y-auto border border-city-fog/15 bg-city-panel/30 p-4">
          <section>
            <p className="mb-4 font-display text-[10px] tracking-[0.22em] text-city-mint uppercase">
              Alert Preview
            </p>
            {data ? (
              <AlertPreviewList alerts={data.alerts} />
            ) : (
              <p className="text-sm text-city-fog">告警加载中…</p>
            )}
          </section>
          <section>
            {data ? <TrendBars title="能耗负荷趋势" points={data.energyTrend} /> : null}
          </section>
        </aside>
      </div>
    </main>
  )
}
