type SettingsToggleProps = {
  label: string
  hint?: string
  checked: boolean
  onLabel: string
  offLabel: string
  onChange: (next: boolean) => void
}

/** 开关行：左文案，右开/关 */
export function SettingsToggle({
  label,
  hint,
  checked,
  onLabel,
  offLabel,
  onChange,
}: SettingsToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-city-snow">{label}</p>
        {hint ? <p className="mt-1 text-xs leading-relaxed text-city-fog">{hint}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => {
          onChange(!checked)
        }}
        className={`shrink-0 border px-3 py-1.5 text-xs transition ${
          checked
            ? 'border-city-mint/50 text-city-mint'
            : 'border-city-fog/30 text-city-fog hover:border-city-fog/50'
        }`}
      >
        {checked ? onLabel : offLabel}
      </button>
    </div>
  )
}
