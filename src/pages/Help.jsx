import { useState } from 'react'
import { Search, HelpCircle, BookOpen, Headphones, AlertTriangle, Plus } from 'lucide-react'
import { FAQS } from '../data/faqs'

const HELP_CARDS = [
  { icon: HelpCircle, title: 'FAQs', sub: 'Find answers to common questions' },
  { icon: BookOpen, title: 'User Guide', sub: 'Learn how to use the library' },
  { icon: Headphones, title: 'Contact Us', sub: 'Get in touch with our support team' },
  { icon: AlertTriangle, title: 'Report an Issue', sub: 'Let us know if you faced any problem' }
]

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="page">
      <div className="page-head">
        <h1>Help &amp; Support</h1>
        <p className="sub">How can we help you?</p>
      </div>

      <div className="explore-search" style={{ maxWidth: 520, marginBottom: 6 }}>
        <Search size={16} />
        <input type="text" placeholder="Search for help topics..." />
      </div>

      <div className="help-grid">
        {HELP_CARDS.map((c) => (
          <div className="help-card" key={c.title}>
            <div className="ic">
              <c.icon />
            </div>
            <b>{c.title}</b>
            <span>{c.sub}</span>
          </div>
        ))}
      </div>

      <div className="section-head">
        <h2>Frequently asked questions</h2>
      </div>
      {FAQS.map((f, i) => (
        <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={f.q}>
          <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {f.q}
            <Plus size={16} />
          </button>
          <div className="faq-a">
            <p>{f.a}</p>
          </div>
        </div>
      ))}

      <div className="lib-info">
        <div>
          
          <span>Library hours</span>
          
          <b>Mon – Sat: 8:00 AM – 8:00 PM</b>
          <br></br>
          <b>Sun: 10:00 AM – 6:00 PM</b>
        </div>
        <div>
          <span>Email</span>
          <b>support@digi-lib.com</b>
        </div>
        <div>
          <span>Location</span>
          <b>Central Library, 123 Library Street</b>
        </div>
        <div>
          <span>Phone</span>
          <b>+91 9567894531</b>
        </div>
      </div>
    </section>
  )
}
