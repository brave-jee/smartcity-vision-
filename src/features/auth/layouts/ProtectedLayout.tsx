import { useEffect } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { RequireAuth } from '@/features/auth/components/RequireAuth'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'
import { appendOpLog } from '@/features/logs/utils/appendOpLog'
import { useAppCopy } from '@/features/settings/hooks/useAppCopy'
import { useDocumentLocale } from '@/features/settings/hooks/useDocumentLocale'
import { useSettingsStore } from '@/features/settings/stores/useSettingsStore'
import { useWeatherStore } from '@/features/weather/stores/useWeatherStore'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 text-xs transition sm:text-sm ${
    isActive ? 'text-city-mint' : 'text-city-fog hover:text-city-mint'
  }`

/**
 * 需登录才能访问的布局：
 * 顶部操作栏 + 内容区（首页大屏等）。
 */
export function ProtectedLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const autoDayNight = useSettingsStore((s) => s.autoDayNight)
  const setWeatherAutoPlay = useWeatherStore((s) => s.setAutoPlay)
  const { copy } = useAppCopy()
  useDocumentLocale()

  // 启动时用设置里的昼夜自动流逝同步天气时钟
  useEffect(() => {
    setWeatherAutoPlay(autoDayNight)
  }, [autoDayNight, setWeatherAutoPlay])

  function handleLogout() {
    appendOpLog({
      actor: user?.displayName ?? user?.username ?? '未知用户',
      action: 'logout',
      title: '退出登录',
      category: 'auth',
    })
    logout()
  }

  return (
    <RequireAuth>
      <div className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-city-fog/15 px-4 py-3 safe-top sm:px-6 sm:py-3">
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-sm tracking-wide text-city-mint">
              SmartCity Vision
            </p>
            <p className="mt-1 truncate text-xs text-city-fog">
              {copy.shell.loggedIn} · {user?.displayName ?? user?.username}
            </p>
          </div>

          <nav
            className="flex shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-3"
            aria-label={copy.shell.navAria}
          >
            <NavLink to="/app" end className={navClass}>
              {copy.shell.navOverview}
            </NavLink>
            <NavLink to="/app/logs" className={navClass}>
              {copy.shell.navLogs}
            </NavLink>
            <NavLink to="/app/settings" className={navClass}>
              {copy.shell.navSettings}
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 border border-city-fog/30 px-3 py-2 text-sm text-city-fog transition hover:border-city-mint hover:text-city-mint active:border-city-mint active:text-city-mint sm:px-4"
          >
            {copy.shell.logout}
          </button>
        </header>
        {/* min-h-0 确保子级大屏网格可以内部滚动，而不是撑破视口 */}
        <div className="min-h-0 flex-1 overflow-hidden safe-bottom">
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  )
}

/** 根路径按登录态分流到大屏或登录页 */
export function AuthRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return <Navigate to={isAuthenticated ? '/app' : '/login'} replace />
}
