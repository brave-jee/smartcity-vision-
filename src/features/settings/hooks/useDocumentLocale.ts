import { useEffect } from 'react'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'

/** 同步 <html lang>，便于无障碍与浏览器本地化行为 */
export function useDocumentLocale() {
  const locale = useSettingsStore((s) => s.locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
}
