import { MeshReflectorMaterial } from '@react-three/drei'
import { useSceneStore } from '@/features/scene3d/stores/useSceneStore'

/**
 * 地面、道路与人行区域：带弱反射的夜景路基。
 * 点击地面可取消建筑选中。
 */
export function Ground() {
  const clearSelection = useSceneStore((s) => s.clearSelection)

  return (
    <group
      onClick={(event) => {
        event.stopPropagation()
        clearSelection()
      }}
    >
      {/* 反射地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[56, 56]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={0.85}
          mixStrength={0.35}
          roughness={0.92}
          depthScale={0.4}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#0a1628"
          metalness={0.35}
          mirror={0.15}
        />
      </mesh>

      {/* 横向主干道 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[56, 2.6]} />
        <meshStandardMaterial color="#152636" metalness={0.2} roughness={0.75} />
      </mesh>

      {/* 纵向主干道 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0]} receiveShadow>
        <planeGeometry args={[2.6, 56]} />
        <meshStandardMaterial color="#152636" metalness={0.2} roughness={0.75} />
      </mesh>

      {/* 路口中央高亮 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <planeGeometry args={[2.6, 2.6]} />
        <meshStandardMaterial
          color="#1d3a45"
          emissive="#2f6f68"
          emissiveIntensity={0.2}
          metalness={0.25}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}
