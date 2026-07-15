/** 天气与昼夜相关类型 */

/** 天气种类 */
export type WeatherKind = 'clear' | 'cloudy' | 'rain' | 'fog'

/** 由小时推导出的大致时段（供 UI 展示） */
export type DayPhase = 'dawn' | 'day' | 'dusk' | 'night'

/** 三维场景使用的气氛参数（颜色 / 强度等） */
export type AtmosphereParams = {
  phase: DayPhase
  background: string
  fogColor: string
  fogNear: number
  fogFar: number
  ambientIntensity: number
  ambientColor: string
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  sunColor: string
  sunIntensity: number
  sunPosition: [number, number, number]
  fillColor: string
  fillIntensity: number
  /** 0–1，路灯与霓虹发光强度系数 */
  streetGlow: number
  starsVisible: boolean
  starsFactor: number
  contactShadowOpacity: number
  showRain: boolean
}
