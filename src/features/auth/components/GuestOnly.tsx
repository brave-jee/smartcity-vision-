import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'

type GuestOnlyProps = {
  children: ReactNode
}

/** Redirect authenticated users away from login. */
export function GuestOnly({ children }: GuestOnlyProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return children
}
