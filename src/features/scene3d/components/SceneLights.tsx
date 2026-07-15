import { useAtmosphere } from '@/features/weather/hooks/useAtmosphere'

/**
 * 场景灯光：随昼夜与天气变化的半球光 / 主光 / 补光。
 */
export function SceneLights() {
  const atmosphere = useAtmosphere()

  return (
    <>
      <hemisphereLight
        color={atmosphere.hemiSky}
        groundColor={atmosphere.hemiGround}
        intensity={atmosphere.hemiIntensity}
      />
      <ambientLight intensity={atmosphere.ambientIntensity} color={atmosphere.ambientColor} />
      <directionalLight
        castShadow
        position={atmosphere.sunPosition}
        intensity={atmosphere.sunIntensity}
        color={atmosphere.sunColor}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={90}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight
        position={[-18, 14, -14]}
        intensity={atmosphere.fillIntensity}
        color={atmosphere.fillColor}
      />
    </>
  )
}
