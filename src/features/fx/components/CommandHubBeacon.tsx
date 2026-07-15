import { COMMAND_HUB } from '@/features/fx/constants'

/**
 * 指挥中枢光柱：飞线汇聚视觉锚点。
 */
export function CommandHubBeacon() {
  return (
    <group position={COMMAND_HUB} raycast={() => null}>
      <mesh>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#5ec4b6"
          emissive="#5ec4b6"
          emissiveIntensity={1.8}
          metalness={0.3}
          roughness={0.25}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, -3.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 6.2, 8]} />
        <meshBasicMaterial color="#5ec4b6" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <pointLight color="#5ec4b6" intensity={1.6} distance={14} decay={2} />
    </group>
  )
}
