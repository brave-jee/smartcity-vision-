import { ContactShadows, OrbitControls, Stars } from '@react-three/drei'
import { CameraFocus } from '@/features/scene3d/components/CameraFocus'
import { GltfCityBuildings } from '@/features/scene3d/components/GltfCityBuildings'
import { GltfRoads } from '@/features/scene3d/components/GltfRoads'
import { Ground } from '@/features/scene3d/components/Ground'
import { SceneLights } from '@/features/scene3d/components/SceneLights'
import { StreetLights } from '@/features/scene3d/components/StreetLights'
import { RainParticles } from '@/features/weather/components/RainParticles'
import { useAtmosphere } from '@/features/weather/hooks/useAtmosphere'

/**
 * 城市场景：建筑交互 + 天气昼夜气氛。
 */
export function CityScene() {
  const atmosphere = useAtmosphere()

  return (
    <>
      <color attach="background" args={[atmosphere.background]} />
      <fog
        attach="fog"
        color={atmosphere.fogColor}
        near={atmosphere.fogNear}
        far={atmosphere.fogFar}
      />

      {atmosphere.starsVisible ? (
        <Stars
          radius={90}
          depth={42}
          count={1400}
          factor={atmosphere.starsFactor}
          saturation={0}
          fade
          speed={0.35}
        />
      ) : null}

      <SceneLights />
      <Ground />
      <GltfRoads />
      <GltfCityBuildings />
      <StreetLights />
      <RainParticles />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={atmosphere.contactShadowOpacity}
        scale={70}
        blur={2.4}
        far={20}
        color="#02060c"
      />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={70}
        maxPolarAngle={Math.PI / 2.18}
        target={[0, 2.5, 0]}
      />
      <CameraFocus />
    </>
  )
}
