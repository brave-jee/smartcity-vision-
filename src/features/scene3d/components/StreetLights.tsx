import { useAtmosphere } from '@/features/weather/hooks/useAtmosphere'

/**
 * 主干道路灯：夜间与降雨时增强自发光与点光。
 */
export function StreetLights() {
  const { streetGlow } = useAtmosphere()
  const lamps: Array<{ x: number; z: number; lit: boolean }> = []

  for (let i = -6; i <= 6; i += 2) {
    if (Math.abs(i) < 2) continue
    lamps.push({ x: i * 3.6, z: 1.35, lit: Math.abs(i) % 4 === 0 })
    lamps.push({ x: 1.35, z: i * 3.6, lit: Math.abs(i) % 4 === 2 })
  }

  const emissive = 0.35 + streetGlow * 2.2
  const pointIntensity = streetGlow * 0.85

  return (
    <group>
      {lamps.map(({ x, z, lit }) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 2.2, 6]} />
            <meshStandardMaterial color="#243447" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 2.25, 0]}>
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshStandardMaterial
              color="#f0d29a"
              emissive="#f0d29a"
              emissiveIntensity={lit ? emissive : emissive * 0.55}
            />
          </mesh>
          {lit && pointIntensity > 0.08 ? (
            <pointLight
              position={[0, 2.2, 0]}
              intensity={pointIntensity}
              distance={7}
              decay={2}
              color="#f2d7a2"
            />
          ) : null}
        </group>
      ))}
    </group>
  )
}
