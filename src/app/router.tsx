import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/app/layouts/AppLayout'
import { GuestOnly } from '@/features/auth/components/GuestOnly'
import { AuthRedirect, ProtectedLayout } from '@/features/auth/layouts/ProtectedLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'

/** 应用路由表：公开登录页 + 鉴权后大屏 */
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
            // 登录后默认进入首页数据大屏
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
])
