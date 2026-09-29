 import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import Logo from '../components/Logo'
import RippleButton from '../components/RippleButton'
import { useEffect, useState } from 'react'

function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const stepTime = 15
    const increment = target / (duration / stepTime)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        clearInterval(timer)
        setCount(target)
      } else {
        setCount(Math.ceil(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target])

  return <b>{count.toLocaleString()}</b>
}

export default function GetStarted() {
  const navigate = useNavigate()

  return (
    <div className="start-screen">
      <nav className="start-nav">
        <button className="ghost-btn" onClick={() => navigate('/auth?mode=login')}>
          Log in
        </button>
      </nav>

      <div className="start-logo-block">
        <Logo size="xl" centered />
      </div>

      <div className="start-hero">
        <div className="start-copy">
          {/* glowing eyebrow */}
          <span className="eyebrow glow">Book Station · Digital Library</span>

          {/* typing animations */}
          <h1 className="typing-title">Find your next great read, in seconds.</h1>
          <p className="lede typing-sub">
            Search, borrow and track thousands of titles from one shelf. Digi-Lib brings your
            library's whole catalogue online, open, organized and always in your pocket.
          </p>

          <div className="start-cta-row">
            <RippleButton className="btn-primary liquid-pop" onClick={() => navigate('/auth?mode=signup')}>
              Get Started
              <ArrowRight size={16} />
            </RippleButton>
          </div>

          <div className="start-stats">
            <div>
              <AnimatedNumber target={25436} />
              <span>Books available</span>
            </div>
            <div>
              <AnimatedNumber target={320} />
              <span>Categories</span>
            </div>
            <div>
              <AnimatedNumber target={12840} />
              <span>Active readers</span>
            </div>
          </div>
        </div>

        <div className="start-visual">
          <div className="shelf-card main">
            <span className="tag">On the shelf today</span>
            <h3>Tiny changes, remarkable results.</h3>
            <div className="shelf-row">
              <div className="mini-book" style={{ background: '#E4B94F', height: 90 }} />
              <div className="mini-book" style={{ background: '#C9724F', height: 70 }} />
              <div className="mini-book" style={{ background: '#7CA982', height: 82 }} />
              <div className="mini-book" style={{ background: '#D9CBB0', height: 64 }} />
              <div className="mini-book" style={{ background: '#6C8FAE', height: 88 }} />
            </div>
          </div>

          <div className="float-card f2">
            <div className="ic gold">
              <Star size={17} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <b>4.8 average</b>
              <span>from 12,840 readers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 