import { useMemo } from 'react'
import { getAppCopy } from '@/features/settings/i18n/appCopy'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'

/** 读取当前语言对应的全站壳层文案 */
export function useAppCopy() {
  const locale = useSettingsStore((s) => s.locale)
  const copy = useMemo(() => getAppCopy(locale), [locale])
  return { locale, copy }
}
