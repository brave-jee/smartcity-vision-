import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '@/features/settings/constants'
import type { AppLocale, RenderQuality, SettingsStateValues } from '@/features/settings/types'

type SettingsState = SettingsStateValues & {
  setQuality: (quality: RenderQuality) => void
  setFxEnabled: (fxEnabled: boolean) => void
  setVehiclesEnabled: (vehiclesEnabled: boolean) => void
  setSoundEnabled: (soundEnabled: boolean) => void
  setLocale: (locale: AppLocale) => void
  setAutoDayNight: (autoDayNight: boolean) => void
  resetSettings: () => void
}

/**
 * 系统设置：画质 / 特效 / 语言等，本地持久化。
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setQuality(quality) {
        set({ quality })
      },

      setFxEnabled(fxEnabled) {
        set({ fxEnabled })
      },

      setVehiclesEnabled(vehiclesEnabled) {
        set({ vehiclesEnabled })
      },

      setSoundEnabled(soundEnabled) {
        set({ soundEnabled })
      },

      setLocale(locale) {
        set({ locale })
      },

      setAutoDayNight(autoDayNight) {
        set({ autoDayNight })
      },

      resetSettings() {
        set({ ...DEFAULT_SETTINGS })
      },
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      partialize: (state) => ({
        quality: state.quality,
        fxEnabled: state.fxEnabled,
        vehiclesEnabled: state.vehiclesEnabled,
        soundEnabled: state.soundEnabled,
        locale: state.locale,
        autoDayNight: state.autoDayNight,
      }),
    },
  ),
)
