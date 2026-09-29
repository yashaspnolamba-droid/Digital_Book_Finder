import { useState } from 'react'
import { Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { user, updateProfile } = useApp()
  const [form, setForm] = useState({ first: user.first, last: user.last, email: user.email, phone: '' })

  const initial = (user.first || 'A')[0].toUpperCase()

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSave() {
    updateProfile({ first: form.first, last: form.last, email: form.email })
  }

  return (
    <section className="page">
      <div className="page-head">
        <h1>Profile</h1>
        <p className="sub">Manage your account details</p>
      </div>

      <div className="profile-top">
        <div className="profile-avatar">{initial}</div>
        <div>
          <h2>
            {user.first} {user.last}
          </h2>
          <div className="em">{user.email}</div>
          <span className="member-badge">
            <Star size={12} fill="currentColor" strokeWidth={0} />
            Member since 2024
          </span>
        </div>
      </div>

      <div className="profile-form">
        <h3>Personal information</h3>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="first">First name</label>
            <input id="first" name="first" type="text" value={form.first} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="last">Last name</label>
            <input id="last" name="last" type="text" value={form.last} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="profileEmail">Email address</label>
            <input id="profileEmail" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" placeholder="+91 " value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="save-row">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </section>
  )
}
