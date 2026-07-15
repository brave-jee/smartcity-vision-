import { ContactShadows, OrbitControls, Stars } from '@react-three/drei'
import { FlylineEffects } from '@/features/fx/components/FlylineEffects'
import { CameraFocus } from '@/features/scene3d/components/CameraFocus'
import { GltfCityBuildings } from '@/features/scene3d/components/GltfCityBuildings'
import { GltfRoads } from '@/features/scene3d/components/GltfRoads'
import { Ground } from '@/features/scene3d/components/Ground'
import { SceneLights } from '@/features/scene3d/components/SceneLights'
import { StreetLights } from '@/features/scene3d/components/StreetLights'
import { useQualityProfile } from '@/features/settings/hooks/useQualityProfile'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'
import { PatrolFleet } from '@/features/vehicles/components/PatrolFleet'
import { RainParticles } from '@/features/weather/components/RainParticles'
import { useAtmosphere } from '@/features/weather/hooks/useAtmosphere'

/**
 * 城市场景：建筑交互 + 天气昼夜 + 车辆巡航 + 飞线粒子。
 * 图层与画质细节由系统设置控制。
 */
export function CityScene() {
  const atmosphere = useAtmosphere()
  const profile = useQualityProfile()
  const fxEnabled = useSettingsStore((s) => s.fxEnabled)
  const vehiclesEnabled = useSettingsStore((s) => s.vehiclesEnabled)

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
          count={profile.starCount}
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
      {vehiclesEnabled ? <PatrolFleet /> : null}
      {fxEnabled ? <FlylineEffects /> : null}
      <RainParticles />

      {profile.contactShadows ? (
        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={atmosphere.contactShadowOpacity}
          scale={70}
          blur={2.4}
          far={20}
          color="#02060c"
        />
      ) : null}

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
