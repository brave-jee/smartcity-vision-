import { create } from 'zustand'
import { DEFAULT_HOUR } from '@/features/weather/constants'
import type { WeatherKind } from '@/features/weather/types'

type WeatherState = {
  /** 仿真小时 0–24 */
  hour: number
  weather: WeatherKind
  /** 是否自动流逝时间 */
  autoPlay: boolean
  setHour: (hour: number) => void
  setWeather: (weather: WeatherKind) => void
  setAutoPlay: (autoPlay: boolean) => void
  toggleAutoPlay: () => void
}

/**
 * 天气与昼夜状态：驱动三维气氛与控制面板。
 */
export const useWeatherStore = create<WeatherState>((set) => ({
  hour: DEFAULT_HOUR,
  weather: 'clear',
  autoPlay: false,

  setHour(hour) {
    const wrapped = ((hour % 24) + 24) % 24
    set({ hour: wrapped })
  },

  setWeather(weather) {
    set({ weather })
  },

  setAutoPlay(autoPlay) {
    set({ autoPlay })
  },

  toggleAutoPlay() {
    set((state) => ({ autoPlay: !state.autoPlay }))
  },
}))
