import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Toast from '../components/Toast'
import { useApp } from '../context/AppContext'

export default function AppLayout() {
  const { isAuthenticated } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />
  }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className="main">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <Outlet />
      </div>
      <Toast />
    </div>
  )
}
