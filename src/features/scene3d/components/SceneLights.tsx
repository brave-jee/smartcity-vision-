/**
 * 场景灯光：半球光 + 月光方向光 + 青绿补光。
 */
export function SceneLights() {
  return (
    <>
      <hemisphereLight args={['#9ec9ff', '#0a1628', 0.45]} />
      <ambientLight intensity={0.18} color="#8ba3b8" />
      <directionalLight
        castShadow
        position={[24, 36, 16]}
        intensity={0.85}
        color="#dbe7f3"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={90}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-18, 14, -14]} intensity={0.35} color="#3d9b8f" />
    </>
  )
}
