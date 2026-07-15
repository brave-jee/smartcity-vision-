import { create } from 'zustand'
import { getBuildingDetail } from '@/features/scene3d/data/buildingDetails'
import type { BuildingDetail } from '@/features/scene3d/types/buildingDetail'

type SceneState = {
  /** 当前选中建筑 id */
  selectedBuildingId: string | null
  /** 选中建筑详情（派生缓存，方便 UI 读取） */
  selectedBuilding: BuildingDetail | null
  /** 选中建筑并写入详情；再次点击同一栋则取消选中 */
  selectBuilding: (id: string) => void
  /** 取消选中 */
  clearSelection: () => void
}

/**
 * 三维场景交互状态：建筑选中 / 取消选中。
 */
export const useSceneStore = create<SceneState>((set, get) => ({
  selectedBuildingId: null,
  selectedBuilding: null,
  selectBuilding(id) {
    // 已选中同一栋时再次点击 → 取消，便于就地操作
    if (get().selectedBuildingId === id) {
      set({
        selectedBuildingId: null,
        selectedBuilding: null,
      })
      return
    }
    set({
      selectedBuildingId: id,
      selectedBuilding: getBuildingDetail(id),
    })
  },
  clearSelection() {
    set({
      selectedBuildingId: null,
      selectedBuilding: null,
    })
  },
}))
