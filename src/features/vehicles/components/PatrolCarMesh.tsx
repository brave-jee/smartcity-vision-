import { useAtmosphere } from '@/features/weather/hooks/useAtmosphere'

type PatrolCarMeshProps = {
  color: string
}

/**
 * 程序化小汽车：车身 + 驾驶舱 + 头灯（夜间随气氛增强）。
 */
export function PatrolCarMesh({ color }: PatrolCarMeshProps) {
  const { streetGlow } = useAtmosphere()
  const headlight = 0.35 + streetGlow * 2.4

  return (
    <group>
      {/* 底盘车身 */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.15, 0.28, 0.52]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.4} />
      </mesh>
      {/* 驾驶舱 */}
      <mesh castShadow position={[-0.08, 0.42, 0]}>
        <boxGeometry args={[0.55, 0.24, 0.46]} />
        <meshStandardMaterial color="#15202e" metalness={0.2} roughness={0.35} />
      </mesh>
      {/* 挡风玻璃感 */}
      <mesh position={[0.12, 0.42, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.44]} />
        <meshStandardMaterial color="#8ec8e8" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      {/* 头灯 */}
      <mesh position={[0.55, 0.22, 0.16]}>
        <boxGeometry args={[0.06, 0.07, 0.1]} />
        <meshStandardMaterial color="#fff2c8" emissive="#ffe29a" emissiveIntensity={headlight} />
      </mesh>
      <mesh position={[0.55, 0.22, -0.16]}>
        <boxGeometry args={[0.06, 0.07, 0.1]} />
        <meshStandardMaterial color="#fff2c8" emissive="#ffe29a" emissiveIntensity={headlight} />
      </mesh>
      {/* 尾灯 */}
      <mesh position={[-0.55, 0.22, 0.16]}>
        <boxGeometry args={[0.05, 0.06, 0.08]} />
        <meshStandardMaterial
          color="#ff6b6b"
          emissive="#d64545"
          emissiveIntensity={0.8 + streetGlow}
        />
      </mesh>
      <mesh position={[-0.55, 0.22, -0.16]}>
        <boxGeometry args={[0.05, 0.06, 0.08]} />
        <meshStandardMaterial
          color="#ff6b6b"
          emissive="#d64545"
          emissiveIntensity={0.8 + streetGlow}
        />
      </mesh>
    </group>
  )
}
