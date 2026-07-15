import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { CatmullRomCurve3, Group, Vector3 } from 'three'
import { PatrolCarMesh } from '@/features/vehicles/components/PatrolCarMesh'
import { PATROL_ROUTES, PATROL_VEHICLES } from '@/features/vehicles/data/patrolRoutes'
import type { PatrolRouteId, PatrolVehicleConfig } from '@/features/vehicles/types'

type PatrolCarProps = {
  config: PatrolVehicleConfig
  curve: CatmullRomCurve3
}

/** 单车沿闭合曲线巡航；不参与射线拾取，避免挡住建筑点击 */
function PatrolCar({ config, curve }: PatrolCarProps) {
  const groupRef = useRef<Group>(null)
  const progressRef = useRef(config.startProgress)
  const pointRef = useRef(new Vector3())
  const tangentRef = useRef(new Vector3())

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    // 限制单帧步长，避免切后台回来后瞬移
    const step = Math.min(delta, 0.05) * config.speed
    progressRef.current = (progressRef.current + step) % 1
    const t = progressRef.current

    const point = pointRef.current
    const tangent = tangentRef.current
    curve.getPointAt(t, point)
    curve.getTangentAt(t, tangent)
    group.position.copy(point)
    // 模型默认朝 +X：用切线在 XZ 平面上的方向
    group.rotation.y = Math.atan2(-tangent.z, tangent.x)
  })

  return (
    <group ref={groupRef} raycast={() => null}>
      <PatrolCarMesh color={config.color} />
    </group>
  )
}

function buildClosedCurve(routeId: PatrolRouteId) {
  const points = PATROL_ROUTES[routeId].map(([x, y, z]) => new Vector3(x, y, z))
  return new CatmullRomCurve3(points, true, 'catmullrom', 0.35)
}

/**
 * 主干道巡航车队：东西 / 南北各一组闭环。
 */
export function PatrolFleet() {
  const curves = useMemo(() => {
    return {
      'ring-ew': buildClosedCurve('ring-ew'),
      'ring-ns': buildClosedCurve('ring-ns'),
    } satisfies Record<PatrolRouteId, CatmullRomCurve3>
  }, [])

  return (
    <group>
      {PATROL_VEHICLES.map((config) => (
        <PatrolCar key={config.id} config={config} curve={curves[config.routeId]} />
      ))}
    </group>
  )
}
