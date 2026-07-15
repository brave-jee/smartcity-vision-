import { ContactShadows, OrbitControls, Stars } from '@react-three/drei'
import { GltfCityBuildings } from '@/features/scene3d/components/GltfCityBuildings'
import { GltfRoads } from '@/features/scene3d/components/GltfRoads'
import { Ground } from '@/features/scene3d/components/Ground'
import { SceneLights } from '@/features/scene3d/components/SceneLights'
import { StreetLights } from '@/features/scene3d/components/StreetLights'

/**
 * 城市场景：KayKit GLTF 建筑/路口 + 夜景灯光/地面反射。
 */
export function CityScene() {
  return (
    <>
      <color attach="background" args={['#050b14']} />
      <fog attach="fog" args={['#050b14', 30, 95]} />

      <Stars radius={90} depth={42} count={1400} factor={3.2} saturation={0} fade speed={0.35} />
      <SceneLights />
      <Ground />
      <GltfRoads />
      <GltfCityBuildings />
      <StreetLights />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.4}
        scale={70}
        blur={2.4}
        far={20}
        color="#02060c"
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={14}
        maxDistance={70}
        maxPolarAngle={Math.PI / 2.18}
        target={[0, 2.5, 0]}
      />
    </>
  )
}
