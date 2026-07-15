import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginApi } from '@/features/auth/api/loginApi'
import { AUTH_STORAGE_KEY } from '@/features/auth/constants'
import type { AuthUser, LoginPayload } from '@/features/auth/types'

type AuthState = {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      async login(payload) {
        const result = await loginApi(payload)
        set({
          token: result.token,
          user: result.user,
          isAuthenticated: true,
        })
      },
      logout() {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: Boolean(state.token),
      }),
    },
  ),
)
