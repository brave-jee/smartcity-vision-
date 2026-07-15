import { useMemo } from 'react'
import { CITY_BUILDINGS } from '@/features/scene3d/data/cityLayout'
import type { CityBuilding } from '@/features/scene3d/types'
import { getFacadeTextures } from '@/features/scene3d/utils/facadeTextures'

type BuildingMeshProps = {
  building: CityBuilding
}

/** 单栋夜景建筑：窗格立面 + 屋顶机房，携带 userData */
function BuildingMesh({ building }: BuildingMeshProps) {
  const textures = useMemo(() => getFacadeTextures(), [])
  const map = textures[building.facadeStyle % textures.length]
  const roofHeight = building.isLandmark ? 0.55 : 0.28

  return (
    <group
      position={[building.x, 0, building.z]}
      userData={{
        buildingId: building.id,
        name: building.name,
      }}
    >
      {/* 主体立面 */}
      <mesh position={[0, building.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[building.width, building.height, building.depth]} />
        <meshStandardMaterial
          map={map}
          color="#d7e7ee"
          emissiveMap={map}
          emissive="#8fd0c6"
          emissiveIntensity={building.isLandmark ? 0.55 : 0.35}
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>

      {/* 屋顶结构，增强体量层次 */}
      <mesh position={[0, building.height + roofHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[building.width * 0.62, roofHeight, building.depth * 0.62]} />
        <meshStandardMaterial color="#1b2d3d" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* 地标塔尖光点 */}
      {building.isLandmark ? (
        <mesh position={[0, building.height + roofHeight + 0.35, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshStandardMaterial color="#e8a54b" emissive="#e8a54b" emissiveIntensity={2.2} />
        </mesh>
      ) : null}
    </group>
  )
}

/**
 * 批量渲染更真实的夜景建筑群。
 */
export function Buildings() {
  return (
    <group>
      {CITY_BUILDINGS.map((building) => (
        <BuildingMesh key={building.id} building={building} />
      ))}
    </group>
  )
}
