import { Clone, useGLTF } from '@react-three/drei'
import { buildingModelPath, type BuildingType } from '@/features/scene3d/constants'
import { GLTF_CITY_PLOTS } from '@/features/scene3d/data/gltfCityLayout'
import '@/features/scene3d/utils/preloadCityBuildings'

type GltfBuildingProps = {
  type: BuildingType
  id: string
  name: string
  position: [number, number, number]
  rotationY: number
  scale: number
}

/** 单栋 GLTF 建筑（Clone 复用几何，避免重复解析内存膨胀） */
function GltfBuilding({ type, id, name, position, rotationY, scale }: GltfBuildingProps) {
  const { scene } = useGLTF(buildingModelPath(type))

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      scale={scale}
      userData={{ buildingId: id, name }}
    >
      <Clone object={scene} castShadow receiveShadow />
    </group>
  )
}

/**
 * 基于 KayKit GLTF 资产组装的城市街区。
 */
export function GltfCityBuildings() {
  return (
    <group>
      {GLTF_CITY_PLOTS.map((plot) => (
        <GltfBuilding
          key={plot.id}
          id={plot.id}
          name={plot.name}
          type={plot.type}
          position={[plot.x, 0, plot.z]}
          rotationY={plot.rotationY}
          scale={plot.scale}
        />
      ))}
    </group>
  )
}
