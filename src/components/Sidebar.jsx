import { NavLink } from 'react-router-dom'
import {
  Home,
  Compass,
  LayoutGrid,
  BookMarked,
  Bookmark,
  History,
  HelpCircle,
  UserRound,
  LogOut
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const NAV = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/explore', label: 'Explore', icon: Compass },
  { to: '/app/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/app/my-books', label: 'My Books', icon: BookMarked },
  { to: '/app/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/app/history', label: 'History', icon: History },
  { to: '/app/help', label: 'Help & Support', icon: HelpCircle },
  { to: '/app/profile', label: 'Profile', icon: UserRound }
]

export default function Sidebar({ open, onNavigate }) {
  const { logout } = useApp()

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      {/* 🌟 Centered Logo Box with Title Below */}
      <div className="sidebar-brand-block">
        <div className="sidebar-logo-box">
          <img
            src="src/assets/logo.png"
            alt="Digi-Lib Logo"
            className="sidebar-logo-img"
          />
        </div>
        <span className="sidebar-app-title">
          DIGI<span>~</span>LIB
        </span>
      </div>

      <nav className="nav-group">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <button className="nav-item" onClick={logout}>
          <LogOut />
          Logout
        </button>
      </div>
    </aside>
  )
}