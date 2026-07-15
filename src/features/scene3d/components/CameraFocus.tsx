import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useSceneStore } from '@/features/scene3d/stores/useSceneStore'

/** 选中后期望的相机到目标距离（明显拉近，贴近 minDistance） */
const FOCUS_DISTANCE = 11
/** 注视高度：落在建筑中部附近 */
const FOCUS_LOOK_Y = 2.8

/**
 * 选中建筑后，平滑注视并拉近相机。
 * 依赖 OrbitControls 设置 makeDefault。
 */
export function CameraFocus() {
  const selectedBuilding = useSceneStore((s) => s.selectedBuilding)
  const targetRef = useRef<Vector3 | null>(null)
  const scratchOffset = useRef(new Vector3())

  useEffect(() => {
    if (!selectedBuilding) {
      targetRef.current = null
      return
    }
    const [x, , z] = selectedBuilding.position
    targetRef.current = new Vector3(x, FOCUS_LOOK_Y, z)
  }, [selectedBuilding])

  useFrame((state, delta) => {
    const orbit = state.controls as OrbitControlsImpl | null
    const focusTarget = targetRef.current
    if (!orbit || !focusTarget) return

    // 与 OrbitControls damping 解耦：选中时主动驱动目标与距离
    const damp = 1 - Math.exp(-5.5 * delta)

    orbit.target.x += (focusTarget.x - orbit.target.x) * damp
    orbit.target.y += (focusTarget.y - orbit.target.y) * damp
    orbit.target.z += (focusTarget.z - orbit.target.z) * damp

    const offset = scratchOffset.current
    offset.copy(state.camera.position).sub(orbit.target)
    const currentDistance = offset.length()
    if (currentDistance > 0.001) {
      const nextDistance = currentDistance + (FOCUS_DISTANCE - currentDistance) * damp
      offset.setLength(nextDistance)
      state.camera.position.copy(orbit.target).add(offset)
    }

    orbit.update()
  })

  return null
}
