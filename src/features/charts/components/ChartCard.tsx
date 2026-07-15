import type { ReactNode } from 'react'

type ChartCardProps = {
  title: string
  children: ReactNode
}

/** Compact chart card for analytics dock */
export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <section className="flex h-full min-h-0 flex-col border border-city-fog/15 bg-city-panel/25 px-2.5 py-2">
      <p className="mb-1 shrink-0 truncate text-[11px] text-city-snow">{title}</p>
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  )
}
