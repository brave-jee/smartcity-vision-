import { WEATHER_OPTIONS } from '@/features/weather/constants'
import { useWeatherClock } from '@/features/weather/hooks/useWeatherClock'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'
import { formatSimClock, getDayPhase, getDayPhaseLabel } from '@/features/weather/utils/atmosphere'

/**
 * 视口内天气 / 昼夜控制：紧凑面板，避免被 overflow 裁切。
 */
export function WeatherControlPanel() {
  useWeatherClock()

  const hour = useWeatherStore((s) => s.hour)
  const weather = useWeatherStore((s) => s.weather)
  const autoPlay = useWeatherStore((s) => s.autoPlay)
  const setHour = useWeatherStore((s) => s.setHour)
  const setWeather = useWeatherStore((s) => s.setWeather)
  const toggleAutoPlay = useWeatherStore((s) => s.toggleAutoPlay)

  const phaseLabel = getDayPhaseLabel(getDayPhase(hour))

  return (
    <div className="pointer-events-auto absolute bottom-3 left-3 z-20 w-[min(calc(100%-1.5rem),16.5rem)] border border-city-fog/25 bg-city-ink/90 p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-[10px] tracking-[0.16em] text-city-mint uppercase">
          Weather
        </p>
        <p className="text-[10px] whitespace-nowrap text-city-fog">
          {formatSimClock(hour)} · {phaseLabel}
        </p>
      </div>

      <label className="mt-2 block">
        <span className="mb-1 block text-[10px] text-city-fog/80">仿真时刻</span>
        <input
          type="range"
          min={0}
          max={24}
          step={0.1}
          value={hour}
          onChange={(event) => {
            setHour(Number(event.target.value))
          }}
          className="weather-range w-full"
        />
      </label>

      <div className="mt-2 grid grid-cols-4 gap-1">
        {WEATHER_OPTIONS.map((option) => {
          const active = weather === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setWeather(option.id)
              }}
              className={`px-1 py-1 text-center text-[10px] transition ${
                active
                  ? 'border border-city-mint/70 bg-city-mint/15 text-city-mint'
                  : 'border border-city-fog/25 text-city-fog hover:border-city-fog/50 hover:text-city-snow'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={toggleAutoPlay}
        className={`mt-2 w-full border px-2 py-1.5 text-[10px] transition ${
          autoPlay
            ? 'border-city-mint/50 bg-city-mint/10 text-city-mint'
            : 'border-city-fog/30 text-city-fog hover:border-city-mint/40 hover:text-city-mint'
        }`}
      >
        {autoPlay ? '自动流逝中 · 点击暂停' : '开启自动昼夜流逝'}
      </button>
    </div>
  )
}
