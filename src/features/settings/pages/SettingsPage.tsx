import { useAuthStore } from '@/features/auth/stores/useAuthStore'
import { appendOpLog } from '@/features/logs/utils/appendOpLog'
import { SettingsSection } from '@/features/settings/components/SettingsSection'
import { SettingsToggle } from '@/features/settings/components/SettingsToggle'
import {
  LOCALE_LABEL,
  LOCALE_OPTIONS,
  QUALITY_LABEL,
  QUALITY_OPTIONS,
} from '@/features/settings/constants'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'
import type { AppLocale, RenderQuality } from '@/features/settings/types'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'

/**
 * 系统设置页：画质 / 图层 / 语言，变更写入本地并记审计日志。
 */
export function SettingsPage() {
  const locale = useSettingsStore((s) => s.locale)
  const quality = useSettingsStore((s) => s.quality)
  const fxEnabled = useSettingsStore((s) => s.fxEnabled)
  const vehiclesEnabled = useSettingsStore((s) => s.vehiclesEnabled)
  const soundEnabled = useSettingsStore((s) => s.soundEnabled)
  const autoDayNight = useSettingsStore((s) => s.autoDayNight)
  const setQuality = useSettingsStore((s) => s.setQuality)
  const setFxEnabled = useSettingsStore((s) => s.setFxEnabled)
  const setVehiclesEnabled = useSettingsStore((s) => s.setVehiclesEnabled)
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled)
  const setLocale = useSettingsStore((s) => s.setLocale)
  const setAutoDayNight = useSettingsStore((s) => s.setAutoDayNight)
  const resetSettings = useSettingsStore((s) => s.resetSettings)
  const setWeatherAutoPlay = useWeatherStore((s) => s.setAutoPlay)

  const { copy } = useAppCopy()
  const text = copy.settings
  const actor = useAuthStore((s) => s.user?.displayName ?? s.user?.username ?? '城市指挥员')

  function logChange(title: string, detail: string) {
    appendOpLog({
      actor,
      action: 'update_settings',
      title,
      category: 'system',
      detail,
    })
  }

  function handleQuality(next: RenderQuality) {
    setQuality(next)
    logChange('调整渲染画质', QUALITY_LABEL[next][locale === 'en' ? 'en' : 'zh'])
  }

  function handleLocale(next: AppLocale) {
    setLocale(next)
    logChange('切换界面语言', LOCALE_LABEL[next])
  }

  function handleReset() {
    resetSettings()
    setWeatherAutoPlay(false)
    logChange('恢复默认设置', 'quality=medium')
  }

  function handleAutoDayNight(next: boolean) {
    setAutoDayNight(next)
    setWeatherAutoPlay(next)
    logChange(next ? '开启昼夜自动流逝' : '关闭昼夜自动流逝', `autoDayNight=${next}`)
  }

  return (
    <main className="flex h-full min-h-0 flex-col overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
      <div className="mb-4 shrink-0">
        <h1 className="font-display text-base tracking-wide text-city-snow sm:text-lg">
          {text.title}
        </h1>
        <p className="mt-0.5 text-xs text-city-fog">{text.subtitle}</p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 pb-6">
        <SettingsSection title={text.sectionRender}>
          <div>
            <p className="text-sm text-city-snow">{text.quality}</p>
            <p className="mt-1 text-xs leading-relaxed text-city-fog">{text.qualityHint}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUALITY_OPTIONS.map((option) => {
                const active = option === quality
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      handleQuality(option)
                    }}
                    className={`px-3 py-1.5 text-xs transition ${
                      active
                        ? 'bg-city-teal/25 text-city-mint'
                        : 'text-city-fog hover:text-city-mint'
                    }`}
                  >
                    {QUALITY_LABEL[option][locale === 'en' ? 'en' : 'zh']}
                  </button>
                )
              })}
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title={text.sectionScene}>
          <SettingsToggle
            label={text.fx}
            checked={fxEnabled}
            onLabel={text.on}
            offLabel={text.off}
            onChange={(next) => {
              setFxEnabled(next)
              logChange(next ? '开启飞线粒子' : '关闭飞线粒子', `fxEnabled=${next}`)
            }}
          />
          <SettingsToggle
            label={text.vehicles}
            checked={vehiclesEnabled}
            onLabel={text.on}
            offLabel={text.off}
            onChange={(next) => {
              setVehiclesEnabled(next)
              logChange(next ? '开启车辆巡航' : '关闭车辆巡航', `vehiclesEnabled=${next}`)
            }}
          />
          <SettingsToggle
            label={text.autoDayNight}
            hint={text.autoDayNightHint}
            checked={autoDayNight}
            onLabel={text.on}
            offLabel={text.off}
            onChange={handleAutoDayNight}
          />
        </SettingsSection>

        <SettingsSection title={text.sectionPrefs}>
          <SettingsToggle
            label={text.sound}
            hint={text.soundHint}
            checked={soundEnabled}
            onLabel={text.on}
            offLabel={text.off}
            onChange={(next) => {
              setSoundEnabled(next)
              logChange(next ? '开启界面音效预留' : '关闭界面音效预留', `soundEnabled=${next}`)
            }}
          />

          <div>
            <p className="text-sm text-city-snow">{text.locale}</p>
            <p className="mt-1 text-xs leading-relaxed text-city-fog">{text.localeHint}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LOCALE_OPTIONS.map((option) => {
                const active = option === locale
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      handleLocale(option)
                    }}
                    className={`px-3 py-1.5 text-xs transition ${
                      active
                        ? 'bg-city-teal/25 text-city-mint'
                        : 'text-city-fog hover:text-city-mint'
                    }`}
                  >
                    {LOCALE_LABEL[option]}
                  </button>
                )
              })}
            </div>
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="border border-city-fog/30 px-3 py-1.5 text-xs text-city-fog transition hover:border-city-mint hover:text-city-mint"
          >
            {text.reset}
          </button>
        </div>
      </div>
    </main>
  )
}
