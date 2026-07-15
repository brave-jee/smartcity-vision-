import type { WeatherKind } from '@/features/weather/types'

/** 默认仿真时刻（傍晚前，便于看出昼夜差异） */
export const DEFAULT_HOUR = 19.5

/** 自动流逝速度：现实 1 秒 ≈ 仿真多少小时 */
export const AUTO_HOUR_PER_SEC = 0.55

export const WEATHER_OPTIONS: Array<{ id: WeatherKind }> = [
  { id: 'clear' },
  { id: 'cloudy' },
  { id: 'rain' },
  { id: 'fog' },
]
