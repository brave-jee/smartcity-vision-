import { useEffect } from 'react'
import { AUTO_HOUR_PER_SEC } from '@/features/weather/constants'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'

/**
 * 自动昼夜流逝：打开 autoPlay 后按帧推进仿真小时。
 */
export function useWeatherClock() {
  const autoPlay = useWeatherStore((s) => s.autoPlay)
  const setHour = useWeatherStore((s) => s.setHour)

  useEffect(() => {
    if (!autoPlay) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const current = useWeatherStore.getState().hour
      setHour(current + dt * AUTO_HOUR_PER_SEC)
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [autoPlay, setHour])
}
