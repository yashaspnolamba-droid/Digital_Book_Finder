import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import { useApp } from '../context/AppContext'

const LABELS = {
  '/app': 'Home',
  '/app/explore': 'Explore',
  '/app/categories': 'Categories',
  '/app/my-books': 'My Books',
  '/app/bookmarks': 'Bookmarks',
  '/app/history': 'History',
  '/app/help': 'Help & Support',
  '/app/profile': 'Profile'
}

export default function Topbar({ onToggleSidebar }) {
  const { user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const label = LABELS[location.pathname] || 'Home'
  const initial = (user.first || 'A')[0].toUpperCase()

  return (
    <div className="topbar">
      <button className="icon-btn menu-toggle" onClick={onToggleSidebar} aria-label="Toggle menu">
        <Menu />
      </button>
      <span className="crumb">
        Digital Library Book Finder / <b>{label}</b>
      </span>
      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell />
          <span className="dot" />
        </button>
        <div className="avatar-chip" onClick={() => navigate('/app/profile')}>
          <div className="avatar-circle">{initial}</div>
          <span className="nm">{user.first}</span>
        </div>
      </div>
    </div>
  )
}
