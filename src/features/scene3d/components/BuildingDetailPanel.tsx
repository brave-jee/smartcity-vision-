import type { BuildingDetail, BuildingStatus } from '@/features/scene3d/types/buildingDetail'
import { useSceneStore } from '@/features/scene3d/stores/useSceneStore'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import type { AppCopy } from '@/features/settings/i18n/appCopy'

function statusLabel(copy: AppCopy, status: BuildingStatus) {
  if (status === 'critical') return copy.building.statusCritical
  if (status === 'warning') return copy.building.statusWarning
  return copy.building.statusNormal
}

function statusClass(status: BuildingStatus) {
  if (status === 'critical') return 'text-city-crimson'
  if (status === 'warning') return 'text-city-amber'
  return 'text-city-mint'
}

type DetailBodyProps = {
  detail: BuildingDetail
  copy: AppCopy
}

function DetailBody({ detail, copy }: DetailBodyProps) {
  return (
    <>
      <div className="mt-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-base tracking-wide text-city-snow">{detail.name}</h2>
        <span className={`text-xs ${statusClass(detail.status)}`}>
          {statusLabel(copy, detail.status)}
        </span>
      </div>
      <p className="mt-1 text-xs text-city-fog">
        {detail.district} · {copy.building.floors(detail.floors)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-city-fog">{detail.summary}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-city-fog">{copy.building.energy}</dt>
          <dd className="mt-1 font-display text-city-snow">{detail.energyMw} MW</dd>
        </div>
        <div>
          <dt className="text-xs text-city-fog">{copy.building.occupancy}</dt>
          <dd className="mt-1 font-display text-city-snow">{detail.occupancy}%</dd>
        </div>
      </dl>
    </>
  )
}

/**
 * 建筑详情浮层：选中后显示在视口右下侧。
 */
export function BuildingDetailPanel() {
  const selectedBuilding = useSceneStore((s) => s.selectedBuilding)
  const clearSelection = useSceneStore((s) => s.clearSelection)
  const { copy } = useAppCopy()

  if (!selectedBuilding) return null

  return (
    <aside className="pointer-events-auto absolute bottom-3 right-3 z-20 w-[min(100%-1.5rem,18rem)] border border-city-fog/25 bg-city-panel/95 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-[10px] tracking-[0.2em] text-city-mint uppercase">
          Building Detail
        </p>
        <button
          type="button"
          onClick={clearSelection}
          className="text-xs text-city-fog transition hover:text-city-mint"
        >
          {copy.building.close}
        </button>
      </div>
      <DetailBody detail={selectedBuilding} copy={copy} />
    </aside>
  )
}
