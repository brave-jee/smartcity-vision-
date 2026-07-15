/**
 * 中央场景动态预览（CSS/SVG）。
 * 正式 Three.js 城市场景将在下一模块挂载到同一视口区域。
 */
export function SceneViewport() {
  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden border border-city-fog/15 bg-city-navy/40 lg:min-h-0">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 58%, rgba(61, 155, 143, 0.22), transparent 62%), linear-gradient(180deg, rgba(10, 22, 40, 0.15), rgba(7, 16, 24, 0.9))',
        }}
      />

      {/* 缓慢漂移的网格，制造“系统在线”感 */}
      <div className="scene-grid pointer-events-none absolute inset-0 opacity-35" />

      {/* 雷达扫描环 */}
      <div className="pointer-events-none absolute left-1/2 top-[46%] h-[min(56vw,280px)] w-[min(56vw,280px)] -translate-x-1/2 -translate-y-1/2">
        <div className="scene-radar absolute inset-0 rounded-full border border-city-mint/20" />
        <div className="scene-radar-delay absolute inset-[12%] rounded-full border border-city-teal/25" />
        <div className="scene-scan absolute inset-0 origin-center rounded-full" />
      </div>

      {/* 简化天际线：不同高度的建筑带呼吸光 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] flex h-[38%] items-end justify-center gap-1.5 px-8 sm:gap-2 sm:px-12">
        {[42, 68, 55, 86, 48, 74, 60, 92, 50, 70, 58, 80].map((height, index) => (
          <div
            key={index}
            className="scene-building w-[6%] max-w-5 min-w-2 bg-city-teal/35"
            style={{
              height: `${height}%`,
              animationDelay: `${index * 0.18}s`,
            }}
          />
        ))}
      </div>

      {/* 底部车流光点 */}
      <div className="pointer-events-none absolute inset-x-[12%] bottom-[16%] h-px overflow-visible bg-city-fog/20">
        <span className="scene-car scene-car-a" />
        <span className="scene-car scene-car-b" />
        <span className="scene-car scene-car-c" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <p className="font-display text-xs tracking-[0.28em] text-city-mint uppercase">
          Live Preview
        </p>
        <p className="mt-3 text-sm text-city-snow/90 sm:text-base">城市孪生视口（动态预览中）</p>
        <p className="mt-2 text-xs text-city-fog/80">下一模块将在此接入完整 3D 城市场景</p>
      </div>
    </div>
  )
}
