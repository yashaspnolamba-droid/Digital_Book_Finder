import { Routes, Route, Navigate } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import AppLayout from './pages/AppLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import MyBooks from './pages/MyBooks'
import Bookmarks from './pages/Bookmarks'
import HistoryPage from './pages/HistoryPage'
import Help from './pages/Help'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="categories" element={<Categories />} />
        <Route path="my-books" element={<MyBooks />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="help" element={<Help />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
