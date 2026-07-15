import { useMemo } from 'react'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'
import { getAtmosphere } from '@/features/weather/utils/atmosphere'

/** 订阅天气状态并缓存气氛参数 */
export function useAtmosphere() {
  const hour = useWeatherStore((s) => s.hour)
  const weather = useWeatherStore((s) => s.weather)
  return useMemo(() => getAtmosphere(hour, weather), [hour, weather])
}
