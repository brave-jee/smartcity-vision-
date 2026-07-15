import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CityScene } from '@/features/scene3d/components/CityScene'

/**
 * 3D 画布容器：嵌入大屏中央视口。
 * - 自适应父级尺寸
 * - 限制 DPR，兼顾清晰度与性能
 */
export function CityCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [28, 20, 30], fov: 40, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <CityScene />
      </Suspense>
    </Canvas>
  )
}
