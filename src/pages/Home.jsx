import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Sparkles, BookOpen, Package, LayoutGrid, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import { CATEGORIES } from '../data/categories'

// ⭕ Self-Contained Circular Graph
function CircularGauge({
  percent,
  size = 88,
  strokeWidth = 8,
  gradientId,
  startColor,
  endColor,
  innerTint
}) {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="gauge-wrapper" style={{ width: size, height: size }}>
      {/* Soft ambient tint contained WITHIN the circle */}
      <div className="gauge-inner-disc" style={{ background: innerTint }} />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="gauge-svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        {/* Gray/Tinted Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(12, 143, 78, 0.12)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Dynamic Glowing Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="gauge-progress-arc"
        />
      </svg>

      {/* Percentage locked in the center */}
      <span className="gauge-percentage-label">{percent}%</span>
    </div>
  )
}

export default function Home() {
  const { books } = useApp()
  const [query, setQuery] = useState('')
  const [openBook, setOpenBook] = useState(null)
  const navigate = useNavigate()

  function runSearch() {
    if (query.trim()) {
      navigate(`/app/explore?q=${encodeURIComponent(query)}`)
    }
  }

  const recommended = books.slice(0, 5)
  const categoriesCount = CATEGORIES.length * 36

  return (
    <section className="page home-page-container">
      {/* 🌟 Animated Hero Banner */}
      <div className="hero-card">
        <div className="copy">
          <div className="hero-badge">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Digital Archive & Reading Hub</span>
          </div>

          <h1 className="hero-title">
            Expand Your Mind, <br />
            <span className="hero-title-accent">One Chapter at a Time.</span>
          </h1>

          <p className="hero-subtitle">
            Search millions of books across title, author, subject or category in our digital library.
          </p>

          <div className="search-pill">
            <input
              type="text"
              placeholder="Search by title, author, subject or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runSearch()}
            />
            <button onClick={runSearch} aria-label="Search" className="search-action-btn">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* 📚 3D Real Books on Shelf */}
        <div className="hero-shelf">
          <div className="b b1" style={{ height: 155, background: '#E4B94F' }} />
          <div className="b b2" style={{ height: 195, background: '#C9724F' }} />
          <div className="b b3" style={{ height: 135, background: '#7CA982' }} />
          <div className="b b4" style={{ height: 175, background: '#6C8FAE' }} />
        </div>
      </div>

      {/* 📊 Strictly Independent Circuital Graph Cards */}
      <div className="stat-row">
        {/* Card 1: Books Available (90%) */}
        <div className="stat-card circular-card card-books">
          <div className="stat-card-top">
            <div className="mini-gauge-icon green-icon">
              <BookOpen size={18} />
            </div>
            <CircularGauge
              percent={90}
              gradientId="grad-books"
              startColor="#0c8f4e"
              endColor="#34d399"
              innerTint="rgba(12, 143, 78, 0.08)"
            />
          </div>
          <div className="stat-card-bottom">
            <b>25,436</b>
            <span>Books Available</span>
          </div>
        </div>

        {/* Card 2: New Arrivals (30%) */}
        <div className="stat-card circular-card card-arrivals">
          <div className="stat-card-top">
            <div className="mini-gauge-icon gold-icon">
              <Package size={18} />
            </div>
            <CircularGauge
              percent={30}
              gradientId="grad-arrivals"
              startColor="#d97706"
              endColor="#f59e0b"
              innerTint="rgba(217, 119, 6, 0.09)"
            />
          </div>
          <div className="stat-card-bottom">
            <b>1,248</b>
            <span>New Arrivals</span>
          </div>
        </div>

        {/* Card 3: Categories (80%) */}
        <div className="stat-card circular-card card-categories">
          <div className="stat-card-top">
            <div className="mini-gauge-icon sage-icon">
              <LayoutGrid size={18} />
            </div>
            <CircularGauge
              percent={80}
              gradientId="grad-categories"
              startColor="#059669"
              endColor="#10b981"
              innerTint="rgba(5, 150, 105, 0.08)"
            />
          </div>
          <div className="stat-card-bottom">
            <b>{categoriesCount}</b>
            <span>Categories</span>
          </div>
        </div>

        {/* Card 4: Active Users (60%) */}
        <div className="stat-card circular-card card-users">
          <div className="stat-card-top">
            <div className="mini-gauge-icon purple-icon">
              <Users size={18} />
            </div>
            <CircularGauge
              percent={60}
              gradientId="grad-users"
              startColor="#042915"
              endColor="#0c8f4e"
              innerTint="rgba(12, 143, 78, 0.08)"
            />
          </div>
          <div className="stat-card-bottom">
            <b>12,840</b>
            <span>Active Users</span>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="section-head">
        <h2>Recommended for you</h2>
        <button className="view-all" onClick={() => navigate('/app/explore')}>
          <span>View All</span>
          <ArrowRight size={14} className="arrow-icon" />
        </button>
      </div>

      <div className="book-grid">
        {recommended.map((b) => (
          <BookCard key={b.id} book={b} onOpen={setOpenBook} />
        ))}
      </div>

      <BookModal book={openBook} onClose={() => setOpenBook(null)} />
    </section>
  )
}