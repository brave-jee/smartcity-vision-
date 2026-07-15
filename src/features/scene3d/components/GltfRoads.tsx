import { Clone, useGLTF } from '@react-three/drei'
import { CITY_MODEL_BASE } from '@/features/scene3d/constants'

/**
 * 十字路口 GLTF 道路拼块（KayKit）。
 * 若资源缺失，组件可安全不挂载。
 */
export function GltfRoads() {
  const junction = useGLTF(`${CITY_MODEL_BASE}/road_junction.gltf`)

  return (
    <group>
      <Clone object={junction.scene} position={[0, 0.01, 0]} scale={3.1} />
    </group>
  )
}

useGLTF.preload(`${CITY_MODEL_BASE}/road_junction.gltf`)
