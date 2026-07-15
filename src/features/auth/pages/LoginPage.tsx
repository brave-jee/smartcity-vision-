import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DEMO_ACCOUNT } from '@/features/auth/constants'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'
import { appendOpLog } from '@/features/logs/utils/appendOpLog'

const fieldClassName =
  'w-full min-h-11 rounded-none border border-city-fog/25 bg-city-panel/70 px-3 py-3 text-base text-city-snow outline-none transition placeholder:text-city-fog/50 focus:border-city-mint sm:px-4'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)

  const [username, setUsername] = useState(DEMO_ACCOUNT.username)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== '/login'
      ? (location.state as { from: string }).from
      : '/app'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ username, password })
      const displayName =
        useAuthStore.getState().user?.displayName ??
        useAuthStore.getState().user?.username ??
        username.trim()
      appendOpLog({
        actor: displayName,
        action: 'login',
        title: '登录平台',
        category: 'auth',
        detail: `账号 ${username.trim()}`,
      })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex h-[100dvh] max-h-[100dvh] w-full overflow-hidden md:flex-row">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 15% 10%, rgba(61, 155, 143, 0.28), transparent 55%), radial-gradient(ellipse 60% 45% at 90% 80%, rgba(232, 165, 75, 0.1), transparent 50%), linear-gradient(155deg, #071018 0%, #0a1628 50%, #061820 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 sm:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139, 163, 184, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 163, 184, 0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 75%)',
        }}
      />

      <aside
        className="relative z-10 hidden h-full flex-1 items-center justify-center px-10 lg:px-16 md:flex"
        aria-hidden="true"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 40% 45%, rgba(94, 196, 182, 0.16), transparent 48%), linear-gradient(250deg, rgba(7, 16, 24, 0.15), rgba(7, 16, 24, 0.45))',
          }}
        />
        <div className="relative max-w-sm text-left">
          <p className="font-display text-xs tracking-[0.25em] text-city-mint uppercase sm:text-sm">
            Digital Twin Command
          </p>
          <p className="mt-4 text-sm leading-relaxed text-city-fog sm:text-base">
            三维城市场景、实时告警与态势分析将在后续模块逐步接入。
          </p>
        </div>
      </aside>

      <section className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col justify-center overflow-y-auto px-5 py-10 safe-top safe-bottom sm:px-8 md:mx-0 md:w-[46%] md:max-w-none md:px-12 lg:px-16">
        <p className="font-display text-[10px] tracking-[0.28em] text-city-mint uppercase sm:text-xs">
          Command Access
        </p>

        <h1 className="mt-3 font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold leading-tight tracking-wide break-words text-city-snow">
          SmartCity Vision
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-city-fog sm:text-base">
          智慧城市数字孪生平台 · 登录后进入指挥视图
        </p>

        <form
          className="mt-8 w-full max-w-md space-y-4 sm:mt-10 sm:space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="block">
            <span className="mb-2 block text-sm text-city-fog">账号</span>
            <input
              className={fieldClassName}
              name="username"
              autoComplete="username"
              inputMode="text"
              enterKeyHint="next"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-city-fog">密码</span>
            <input
              className={fieldClassName}
              name="password"
              type="password"
              autoComplete="current-password"
              enterKeyHint="done"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error ? (
            <p className="text-sm leading-relaxed break-words text-city-crimson" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="min-h-11 w-full bg-city-teal px-4 py-3 text-sm font-medium text-city-ink transition hover:bg-city-mint active:bg-city-mint/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? '登录中…' : '进入平台'}
          </button>
        </form>

        <p className="mt-5 max-w-md text-xs leading-relaxed text-city-fog/80 sm:mt-6">
          演示账号：{DEMO_ACCOUNT.username} / {DEMO_ACCOUNT.password}
        </p>
      </section>
    </main>
  )
}
