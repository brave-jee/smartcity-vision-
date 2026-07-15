import { useGLTF } from '@react-three/drei'
import { buildingModelPath, type BuildingType } from '@/features/scene3d/constants'

/** 预加载全部建筑 GLTF，减少首次进入大屏卡顿 */
export function preloadCityBuildings() {
  ;(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as BuildingType[]).forEach((type) => {
    useGLTF.preload(buildingModelPath(type))
  })
}

preloadCityBuildings()
