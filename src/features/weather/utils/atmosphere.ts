import type { AtmosphereParams, DayPhase, WeatherKind } from '@/features/weather/types'

/** 按小时归属时段 */
export function getDayPhase(hour: number): DayPhase {
  const h = ((hour % 24) + 24) % 24
  if (h >= 5 && h < 8) return 'dawn'
  if (h >= 8 && h < 17) return 'day'
  if (h >= 17 && h < 20) return 'dusk'
  return 'night'
}

export function getDayPhaseLabel(phase: DayPhase) {
  if (phase === 'dawn') return '黎明'
  if (phase === 'day') return '白昼'
  if (phase === 'dusk') return '黄昏'
  return '夜晚'
}

/** 线性插值 */
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/** 在若干关键帧之间按小时平滑取样 */
function sampleCurve(hour: number, keys: Array<[number, number]>) {
  const h = ((hour % 24) + 24) % 24
  for (let i = 0; i < keys.length - 1; i += 1) {
    const [h0, v0] = keys[i]!
    const [h1, v1] = keys[i + 1]!
    if (h >= h0 && h <= h1) {
      const t = h1 === h0 ? 0 : (h - h0) / (h1 - h0)
      return mix(v0, v1, t)
    }
  }
  return keys[keys.length - 1]![1]
}

/**
 * 根据仿真小时与天气，计算场景气氛参数。
 */
export function getAtmosphere(hour: number, weather: WeatherKind): AtmosphereParams {
  const phase = getDayPhase(hour)
  const h = ((hour % 24) + 24) % 24

  // 太阳高度：正午最高，夜间为负
  const sunElevation = Math.sin(((h - 6) / 12) * Math.PI)
  const dayFactor = Math.max(0, Math.min(1, (sunElevation + 0.15) / 1.15))
  const nightFactor = 1 - dayFactor

  let bg =
    phase === 'day'
      ? '#87b8d8'
      : phase === 'dawn'
        ? '#6a8ab0'
        : phase === 'dusk'
          ? '#2a3d5c'
          : '#050b14'
  let fogColor = bg
  let fogNear = 38
  let fogFar = 110
  let ambientIntensity = mix(0.12, 0.55, dayFactor)
  const ambientColor = mixHex('#6a7f94', '#c9d7e4', dayFactor)
  const hemiSky = mixHex('#4a6a90', '#cfe8ff', dayFactor)
  const hemiGround = mixHex('#0a1628', '#7a9ab0', dayFactor)
  const hemiIntensity = mix(0.28, 0.72, dayFactor)
  const sunColor = mixHex('#a8c4e0', '#fff4d6', dayFactor)
  let sunIntensity = mix(0.15, 1.35, dayFactor)
  const fillIntensity = mix(0.22, 0.18, dayFactor)
  let streetGlow = mix(0.15, 1, nightFactor)
  let starsVisible = nightFactor > 0.45
  const starsFactor = mix(0, 3.4, Math.max(0, (nightFactor - 0.4) / 0.6))
  const contactShadowOpacity = mix(0.18, 0.42, dayFactor)
  let showRain = false

  // 太阳方位随时间绕行
  const angle = ((h - 6) / 24) * Math.PI * 2
  const sunPosition: [number, number, number] = [
    Math.cos(angle) * 32,
    Math.max(4, sunElevation * 42 + 6),
    Math.sin(angle) * 26,
  ]

  if (weather === 'cloudy') {
    bg = mixHex(bg, '#6d849a', 0.45)
    fogColor = mixHex(fogColor, '#7a8fa3', 0.4)
    sunIntensity *= 0.55
    ambientIntensity *= 0.85
    fogNear = 28
    fogFar = 88
  }

  if (weather === 'fog') {
    bg = mixHex(bg, '#8a9aaa', 0.55)
    fogColor = mixHex(fogColor, '#9aa8b5', 0.65)
    fogNear = 8
    fogFar = 42
    sunIntensity *= 0.35
    ambientIntensity = mix(ambientIntensity, 0.48, 0.5)
    starsVisible = false
    streetGlow = Math.min(1, streetGlow + 0.15)
  }

  if (weather === 'rain') {
    bg = mixHex(bg, '#3a4a5c', 0.5)
    fogColor = mixHex(fogColor, '#4a5a6c', 0.45)
    fogNear = 18
    fogFar = 70
    sunIntensity *= 0.4
    ambientIntensity *= 0.75
    showRain = true
    streetGlow = Math.min(1, streetGlow + 0.25)
    starsVisible = false
  }

  return {
    phase,
    background: bg,
    fogColor,
    fogNear,
    fogFar,
    ambientIntensity,
    ambientColor,
    hemiSky,
    hemiGround,
    hemiIntensity,
    sunColor,
    sunIntensity,
    sunPosition,
    fillColor: '#3d9b8f',
    fillIntensity,
    streetGlow:
      sampleCurve(h, [
        [0, 1],
        [5, 0.85],
        [7, 0.25],
        [17, 0.35],
        [19, 0.85],
        [24, 1],
      ]) * (weather === 'clear' ? streetGlow : Math.max(streetGlow, 0.35)),
    starsVisible,
    starsFactor,
    contactShadowOpacity,
    showRain,
  }
}

/** 简易十六进制插值（仅 6 位） */
function mixHex(a: string, b: string, t: number) {
  const pa = parseHex(a)
  const pb = parseHex(b)
  const r = Math.round(mix(pa[0], pb[0], t))
  const g = Math.round(mix(pa[1], pb[1], t))
  const bl = Math.round(mix(pa[2], pb[2], t))
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`
}

function parseHex(hex: string): [number, number, number] {
  const raw = hex.replace('#', '')
  return [
    Number.parseInt(raw.slice(0, 2), 16),
    Number.parseInt(raw.slice(2, 4), 16),
    Number.parseInt(raw.slice(4, 6), 16),
  ]
}

function toHex(n: number) {
  return n.toString(16).padStart(2, '0')
}

/** 格式化为 HH:mm */
export function formatSimClock(hour: number) {
  const h = ((hour % 24) + 24) % 24
  const hh = Math.floor(h)
  const mm = Math.floor((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}
