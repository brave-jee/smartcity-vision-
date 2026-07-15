import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'
import { getAtmosphere } from '@/features/weather/utils/atmosphere'

const DROP_COUNT = 900

/**
 * 简易雨滴粒子：仅在降雨天气显示。
 */
export function RainParticles() {
  const hour = useWeatherStore((s) => s.hour)
  const weather = useWeatherStore((s) => s.weather)
  const showRain = getAtmosphere(hour, weather).showRain
  const pointsRef = useRef<Points>(null)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(DROP_COUNT * 3)
    for (let i = 0; i < DROP_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 56
      positions[i * 3 + 1] = Math.random() * 28
      positions[i * 3 + 2] = (Math.random() - 0.5) * 56
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    const mat = new PointsMaterial({
      color: '#9eb4c8',
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    return { geometry: geo, material: mat }
  }, [])

  useFrame((_, delta) => {
    if (!showRain || !pointsRef.current) return
    const attr = pointsRef.current.geometry.getAttribute('position') as BufferAttribute
    const array = attr.array as Float32Array
    const fall = delta * 18
    for (let i = 0; i < DROP_COUNT; i += 1) {
      const yi = i * 3 + 1
      array[yi]! -= fall
      if (array[yi]! < 0) {
        array[yi] = 22 + Math.random() * 8
        array[i * 3]! = (Math.random() - 0.5) * 56
        array[i * 3 + 2]! = (Math.random() - 0.5) * 56
      }
    }
    attr.needsUpdate = true
  })

  if (!showRain) return null

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
