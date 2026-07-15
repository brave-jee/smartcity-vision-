import { QUALITY_PROFILES } from '@/features/settings/constants'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'
import type { QualityProfile } from '@/features/settings/types'

/** 当前画质档的渲染参数 */
export function useQualityProfile(): QualityProfile {
  const quality = useSettingsStore((s) => s.quality)
  return QUALITY_PROFILES[quality]
}
