import { Navigate, Outlet } from 'react-router-dom'
import { RequireAuth } from '@/features/auth/components/RequireAuth'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'

export function ProtectedLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <RequireAuth>
      <div className="flex min-h-[100dvh] min-h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-city-fog/15 px-4 py-3 safe-top sm:px-6 sm:py-4">
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-sm tracking-wide text-city-mint">
              SmartCity Vision
            </p>
            <p className="mt-1 truncate text-xs text-city-fog">
              已登录 · {user?.displayName ?? user?.username}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout()
            }}
            className="shrink-0 border border-city-fog/30 px-3 py-2 text-sm text-city-fog transition hover:border-city-mint hover:text-city-mint active:border-city-mint active:text-city-mint sm:px-4"
          >
            退出登录
          </button>
        </header>
        <div className="flex-1 safe-bottom">
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  )
}

export function AuthRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return <Navigate to={isAuthenticated ? '/app' : '/login'} replace />
}
