import { AmbientParticles } from '@/features/fx/components/AmbientParticles'
import { CommandHubBeacon } from '@/features/fx/components/CommandHubBeacon'
import { FlylineBeam } from '@/features/fx/components/FlylineBeam'
import { useFlylineInstances } from '@/features/fx/hooks/useFlylineInstances'

/**
 * 飞线与粒子特效层：氛围微粒 + 中枢信标 + 告警/数据飞线。
 */
export function FlylineEffects() {
  const lines = useFlylineInstances()

  return (
    <group>
      <AmbientParticles />
      <CommandHubBeacon />
      {lines.map((line) => (
        <FlylineBeam key={line.id} line={line} />
      ))}
    </group>
  )
}
