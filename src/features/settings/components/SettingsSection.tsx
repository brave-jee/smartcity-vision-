import type { ReactNode } from 'react'

type SettingsSectionProps = {
  title: string
  children: ReactNode
}

/** 设置页分区：细描边，避免卡片堆叠感 */
export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className="border border-city-fog/15 bg-city-panel/20 p-4">
      <p className="mb-4 font-display text-[10px] tracking-[0.2em] text-city-mint uppercase">
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
