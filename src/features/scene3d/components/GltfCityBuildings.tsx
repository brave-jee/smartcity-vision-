import { Clone, useCursor, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import { buildingModelPath, type BuildingType } from '@/features/scene3d/constants'
import { GLTF_CITY_PLOTS } from '@/features/scene3d/data/gltfCityLayout'
import { useSceneStore } from '@/features/scene3d/stores/useSceneStore'
import '@/features/scene3d/utils/preloadCityBuildings'

/** 超过该像素位移则视为拖拽，不触发选中 */
const CLICK_MOVE_THRESHOLD_SQ = 36

type GltfBuildingProps = {
  type: BuildingType
  id: string
  name: string
  position: [number, number, number]
  rotationY: number
  scale: number
}

/** 单栋可点选 GLTF 建筑 */
function GltfBuilding({ type, id, name, position, rotationY, scale }: GltfBuildingProps) {
  const { scene } = useGLTF(buildingModelPath(type))
  const selectedBuildingId = useSceneStore((s) => s.selectedBuildingId)
  const selectBuilding = useSceneStore((s) => s.selectBuilding)
  const [hovered, setHovered] = useState(false)
  const pointerDownRef = useRef({ x: 0, y: 0 })
  const selected = selectedBuildingId === id

  useCursor(hovered)

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      scale={scale}
      userData={{ buildingId: id, name }}
      onPointerDown={(event) => {
        pointerDownRef.current = { x: event.clientX, y: event.clientY }
      }}
      onClick={(event) => {
        event.stopPropagation()
        const dx = event.clientX - pointerDownRef.current.x
        const dy = event.clientY - pointerDownRef.current.y
        // 拖拽旋转相机时不选中，避免误触
        if (dx * dx + dy * dy > CLICK_MOVE_THRESHOLD_SQ) return
        selectBuilding(id)
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => {
        setHovered(false)
      }}
    >
      <Clone object={scene} castShadow receiveShadow />

      {/* 选中高亮环：下一层也可用轮廓描边替换 */}
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <ringGeometry args={[1.05, 1.28, 48]} />
          <meshBasicMaterial color="#5ec4b6" transparent opacity={0.9} />
        </mesh>
      ) : null}

      {hovered && !selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[1.05, 1.18, 32]} />
          <meshBasicMaterial color="#e8a54b" transparent opacity={0.55} />
        </mesh>
      ) : null}
    </group>
  )
}

/**
 * 可交互城市街区：点击选中建筑，悬浮提示可点。
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
