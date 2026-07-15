/**
 * 主干道路灯：多数仅用自发光球，少量点光，兼顾观感与性能。
 */
export function StreetLights() {
  const lamps: Array<{ x: number; z: number; lit: boolean }> = []

  for (let i = -6; i <= 6; i += 2) {
    if (Math.abs(i) < 2) continue
    lamps.push({ x: i * 3.6, z: 1.35, lit: Math.abs(i) % 4 === 0 })
    lamps.push({ x: 1.35, z: i * 3.6, lit: Math.abs(i) % 4 === 2 })
  }

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
              emissiveIntensity={lit ? 2.4 : 1.4}
            />
          </mesh>
          {lit ? (
            <pointLight
              position={[0, 2.2, 0]}
              intensity={0.7}
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
