import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Auth() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  const { login, signup, showToast } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.get('mode') === 'signup' || params.get('mode') === 'login') {
      setMode(params.get('mode'))
    }
  }, [params])

  function handleLogin(e) {
    e.preventDefault()
    const email = e.target.elements.email.value
    login(email)
    showToast('Welcome back!')
    navigate('/app')
  }

  function handleSignup(e) {
    e.preventDefault()
    const first = e.target.elements.first.value
    const last = e.target.elements.last.value
    const email = e.target.elements.email.value
    signup(first, last, email)
    showToast(`Welcome, ${first || 'Reader'}!`)
    navigate('/app')
  }

  return (
    <div className="auth-screen">
      {/* Left side with looping scrolling books background */}
      <div className="auth-side">
        {/* 📚 Seamless Infinite Horizontal Scrolling Books Layer */}
        <div className="auth-books-track" />
        <div className="auth-books-overlay" />

        <div className="auth-quote">
          <h2>A library card for everything you'll ever want to read.</h2>
          <p>
            Track what you're borrowing, save what you want to read next, and pick up right
            where you left off, on any device.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="auth-form-wrap">
        <div className="auth-box">
          <div className="auth-tabs">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
              Log In
            </button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
              Sign Up
            </button>
          </div>

          {mode === 'login' ? (
            <div>
              <h1>Welcome back</h1>
              <p className="sub">Log in to pick up your reading where you left off.</p>
              <form onSubmit={handleLogin}>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="auth-remember">
                  <label>
                    <input type="checkbox" style={{ width: 14, height: 14 }} />
                    Remember me
                  </label>
                  <a href="#!">Forgot password?</a>
                </div>
                <button className="btn-primary auth-submit" type="submit">
                  Log In
                </button>
              </form>
              <p className="auth-alt">
                New to Digi-Lib? <button onClick={() => setMode('signup')}>Create an account</button>
              </p>
            </div>
          ) : (
            <div>
              <h1>Create your account</h1>
              <p className="sub">Join thousands of readers using the library online.</p>
              <form onSubmit={handleSignup}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="first">First name</label>
                    <input id="first" name="first" type="text" placeholder="Ada" required />
                  </div>
                  <div className="field">
                    <label htmlFor="last">Last name</label>
                    <input id="last" name="last" type="text" placeholder="Lovelace" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="signupEmail">Email address</label>
                  <input id="signupEmail" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="signupPassword">Password</label>
                  <input id="signupPassword" name="password" type="password" placeholder="Create a password" required />
                </div>
                <button className="btn-primary auth-submit" type="submit">
                  Create Account
                </button>
              </form>
              <p className="auth-alt">
                Already a member? <button onClick={() => setMode('login')}>Log in</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}