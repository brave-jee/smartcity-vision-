/** 渲染画质档 */
export type RenderQuality = 'low' | 'medium' | 'high'

/** 界面语言 */
export type AppLocale = 'zh-CN' | 'en'

export type QualityProfile = {
  /** Canvas devicePixelRatio 上限 */
  dprMax: number
  shadows: boolean
  antialias: boolean
  starCount: number
  contactShadows: boolean
  particleCount: number
}

export type SettingsStateValues = {
  quality: RenderQuality
  /** 飞线 / 粒子特效 */
  fxEnabled: boolean
  /** 车辆巡航 */
  vehiclesEnabled: boolean
  /** 预留音效开关（演示暂无音频源） */
  soundEnabled: boolean
  locale: AppLocale
  /** 启动后跟随天气面板的昼夜自动流逝 */
  autoDayNight: boolean
}
