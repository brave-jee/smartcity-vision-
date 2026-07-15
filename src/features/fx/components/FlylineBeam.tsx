import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, QuadraticBezierCurve3, Vector3 } from 'three'
import type { FlylineInstance } from '@/features/fx/types'

function levelColor(level: FlylineInstance['level']) {
  if (level === 'critical') return '#d64545'
  if (level === 'warning') return '#e8a54b'
  return '#5ec4b6'
}

/** 由字符串稳定映射到 0–1 相位 */
function hashPhase(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return (hash % 1000) / 1000
}

type FlylineBeamProps = {
  line: FlylineInstance
}

/**
 * 单条抛物飞线：半透明轨迹 + 沿线移动的光点。
 * 仅告警飞线挂 pointLight，控制场景灯光数量。
 */
export function FlylineBeam({ line }: FlylineBeamProps) {
  const pulseRef = useRef<Group>(null)
  const progressRef = useRef(hashPhase(line.id))
  const color = levelColor(line.level)
  const isAlert = line.kind === 'alert'

  const { curve, points } = useMemo(() => {
    const from = new Vector3(...line.from)
    const to = new Vector3(...line.to)
    const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5)
    mid.y += line.arch
    const nextCurve = new QuadraticBezierCurve3(from, mid, to)
    return {
      curve: nextCurve,
      points: nextCurve.getPoints(36).map((p) => [p.x, p.y, p.z] as [number, number, number]),
    }
  }, [line.from, line.to, line.arch])

  const scratch = useMemo(() => new Vector3(), [])

  useFrame((_, delta) => {
    const pulse = pulseRef.current
    if (!pulse) return
    const step = Math.min(delta, 0.05) / line.period
    progressRef.current = (progressRef.current + step) % 1
    curve.getPoint(progressRef.current, scratch)
    pulse.position.copy(scratch)
  })

  return (
    <group raycast={() => null}>
      <Line
        points={points}
        color={color}
        lineWidth={isAlert ? 2.2 : 1.2}
        transparent
        opacity={isAlert ? 0.85 : 0.35}
        depthWrite={false}
      />
      <group ref={pulseRef}>
        <mesh>
          <sphereGeometry args={[isAlert ? 0.22 : 0.14, 10, 10]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} depthWrite={false} />
        </mesh>
        {isAlert ? <pointLight color={color} intensity={1.4} distance={6} decay={2} /> : null}
      </group>
    </group>
  )
}
