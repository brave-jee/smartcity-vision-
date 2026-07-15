import type {
  AppLocale,
  QualityProfile,
  RenderQuality,
  SettingsStateValues,
} from '@/features/settings/types'

export const SETTINGS_STORAGE_KEY = 'smartcity-settings'

export const DEFAULT_SETTINGS: SettingsStateValues = {
  quality: 'medium',
  fxEnabled: true,
  vehiclesEnabled: true,
  soundEnabled: false,
  locale: 'zh-CN',
  autoDayNight: false,
}

export const QUALITY_OPTIONS: RenderQuality[] = ['low', 'medium', 'high']

export const LOCALE_OPTIONS: AppLocale[] = ['zh-CN', 'en']

/** 各画质档对应的渲染参数 */
export const QUALITY_PROFILES: Record<RenderQuality, QualityProfile> = {
  low: {
    dprMax: 1,
    shadows: false,
    antialias: false,
    starCount: 400,
    contactShadows: false,
    particleCount: 80,
  },
  medium: {
    dprMax: 1.5,
    shadows: true,
    antialias: true,
    starCount: 900,
    contactShadows: true,
    particleCount: 160,
  },
  high: {
    dprMax: 2,
    shadows: true,
    antialias: true,
    starCount: 1400,
    contactShadows: true,
    particleCount: 220,
  },
}

export const QUALITY_LABEL: Record<RenderQuality, { zh: string; en: string }> = {
  low: { zh: '低', en: 'Low' },
  medium: { zh: '中', en: 'Medium' },
  high: { zh: '高', en: 'High' },
}

export const LOCALE_LABEL: Record<AppLocale, string> = {
  'zh-CN': '简体中文',
  en: 'English',
}
