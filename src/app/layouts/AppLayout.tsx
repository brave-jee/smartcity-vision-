import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="app-shell bg-city-ink text-city-snow">
      <Outlet />
    </div>
  )
}
