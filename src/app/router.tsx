import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AppHomePage } from '@/app/pages/AppHomePage'
import { GuestOnly } from '@/features/auth/components/GuestOnly'
import { AuthRedirect, ProtectedLayout } from '@/features/auth/layouts/ProtectedLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <AuthRedirect />,
      },
      {
        path: 'login',
        element: (
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        ),
      },
      {
        path: 'app',
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <AppHomePage />,
          },
        ],
      },
    ],
  },
])
