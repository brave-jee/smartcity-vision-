import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-full bg-city-ink text-city-snow">
      <Outlet />
    </div>
  )
}
