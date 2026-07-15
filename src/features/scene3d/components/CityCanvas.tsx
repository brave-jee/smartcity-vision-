import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CityScene } from '@/features/scene3d/components/CityScene'
import { useSceneStore } from '@/features/scene3d/stores/useSceneStore'
import { useQualityProfile } from '@/features/settings/hooks/useQualityProfile'

/**
 * 3D 画布容器：嵌入大屏中央视口。
 * 点击空白处取消建筑选中；画质跟随系统设置。
 */
export function CityCanvas() {
  const clearSelection = useSceneStore((s) => s.clearSelection)
  const profile = useQualityProfile()

  return (
    <Canvas
      className="!h-full !w-full touch-none"
      style={{ width: '100%', height: '100%' }}
      shadows={profile.shadows}
      dpr={[1, profile.dprMax]}
      camera={{ position: [28, 20, 30], fov: 40, near: 0.1, far: 200 }}
      gl={{
        antialias: profile.antialias,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      onPointerMissed={() => {
        clearSelection()
      }}
    >
      <Suspense fallback={null}>
        <CityScene />
      </Suspense>
    </Canvas>
  )
}
