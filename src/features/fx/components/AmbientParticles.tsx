import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three'
import { useQualityProfile } from '@/features/settings/hooks/useQualityProfile'

/**
 * 城市上空漂浮微粒，增强数字孪生氛围。
 * 数量随画质档变化。
 */
export function AmbientParticles() {
  const pointsRef = useRef<Points>(null)
  const { particleCount } = useQualityProfile()

  const { geometry, material, count } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 48
      positions[i * 3 + 1] = 1 + Math.random() * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 48
      speeds[i] = 0.25 + Math.random() * 0.55
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    geo.setAttribute('speed', new BufferAttribute(speeds, 1))
    const mat = new PointsMaterial({
      color: '#5ec4b6',
      size: 0.09,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      sizeAttenuation: true,
    })
    return { geometry: geo, material: mat, count: particleCount }
  }, [particleCount])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return
    const attr = points.geometry.getAttribute('position') as BufferAttribute
    const speedAttr = points.geometry.getAttribute('speed') as BufferAttribute
    const array = attr.array as Float32Array
    const speeds = speedAttr.array as Float32Array
    const step = Math.min(delta, 0.05)

    for (let i = 0; i < count; i += 1) {
      const yi = i * 3 + 1
      array[yi]! += step * speeds[i]!
      if (array[yi]! > 18) {
        array[yi] = 0.8 + Math.random() * 2
        array[i * 3]! = (Math.random() - 0.5) * 48
        array[i * 3 + 2]! = (Math.random() - 0.5) * 48
      }
    }
    attr.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} raycast={() => null} />
}
