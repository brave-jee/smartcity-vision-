import { lazy, Suspense } from 'react'
import { BuildingDetailPanel } from '@/features/scene3d/components/BuildingDetailPanel'
import { WeatherControlPanel } from '@/features/weather/components/WeatherControlPanel'

/** 按需加载 Three 相关包，避免首屏登录页也打进大体量 3D 依赖 */
const CityCanvas = lazy(async () => {
  const module = await import('@/features/scene3d/components/CityCanvas')
  return { default: module.CityCanvas }
})

/**
 * 大屏中央视口：三维场景 + 建筑详情 + 天气昼夜控制。
 */
export function SceneViewport() {
  return (
    <div className="relative h-full min-h-[220px] w-full overflow-hidden border border-city-fog/15 bg-city-ink lg:min-h-0">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-city-fog">
            三维场景加载中…
          </div>
        }
      >
        <CityCanvas />
      </Suspense>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
        <div>
          <p className="font-display text-[10px] tracking-[0.22em] text-city-mint uppercase sm:text-xs">
            3D City Scene
          </p>
          <p className="mt-1 text-xs text-city-fog">点击建筑查看详情 · 主干道车辆巡航中</p>
        </div>
        <p className="max-w-[10rem] text-right text-[10px] leading-relaxed text-city-fog/80 sm:max-w-none sm:text-xs">
          拖拽旋转 · 滚轮缩放 · 再点取消
        </p>
      </div>

      <WeatherControlPanel />
      <BuildingDetailPanel />
    </div>
  )
}
