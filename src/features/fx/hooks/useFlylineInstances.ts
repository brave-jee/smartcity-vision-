import { useMemo } from 'react'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'
import { AMBIENT_FLYLINE_COUNT, COMMAND_HUB, MAX_ALERT_FLYLINES } from '@/features/fx/constants'
import { buildAmbientTargets, resolveDistrictTarget } from '@/features/fx/data/flylineTargets'
import type { FlylineInstance } from '@/features/fx/types'

/**
 * 由告警列表 + 常驻氛围生成飞线实例。
 * warning / critical 且未确认的告警会拉起从中枢到片区的飞线。
 */
export function useFlylineInstances(): FlylineInstance[] {
  const alerts = useAlertStore((s) => s.alerts)

  return useMemo(() => {
    const ambientTargets = buildAmbientTargets().slice(0, AMBIENT_FLYLINE_COUNT)
    const ambient: FlylineInstance[] = ambientTargets.map((to, index) => ({
      id: `ambient-${index}`,
      kind: 'ambient',
      level: 'info',
      from: COMMAND_HUB,
      to,
      arch: 4.5 + (index % 3) * 1.2,
      period: 5.5 + index * 0.7,
    }))

    const alertLines: FlylineInstance[] = alerts
      .filter((item) => !item.acknowledged && item.level !== 'info')
      .slice(0, MAX_ALERT_FLYLINES)
      .map((item) => ({
        id: `alert-${item.id}`,
        kind: 'alert' as const,
        level: item.level,
        from: COMMAND_HUB,
        to: resolveDistrictTarget(item.district),
        arch: item.level === 'critical' ? 8 : 6,
        period: item.level === 'critical' ? 3.2 : 4.2,
      }))

    return [...ambient, ...alertLines]
  }, [alerts])
}
