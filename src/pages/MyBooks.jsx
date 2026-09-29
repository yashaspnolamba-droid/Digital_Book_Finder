import { useState } from 'react'
import { BookMarked } from 'lucide-react'
import { useApp } from '../context/AppContext'
import EmptyState from '../components/EmptyState'

const TABS = [
  { id: 'borrowed', label: 'Borrowed' },
  { id: 'reservations', label: 'Reservations' },
  { id: 'wishlist', label: 'Wishlist' }
]

export default function MyBooks() {
  const [tab, setTab] = useState('borrowed')
  const { books, reservations, wishlist, returnBook, cancelReservation, borrowBook } = useApp()

  let list = []
  if (tab === 'borrowed') list = books.filter((b) => b.status === 'checked_out')
  if (tab === 'reservations') list = books.filter((b) => reservations.has(b.id))
  if (tab === 'wishlist') list = books.filter((b) => wishlist.has(b.id))

  return (
    <section className="page">
      <div className="page-head">
        <h1>My Books</h1>
        <p className="sub">Everything you're currently reading or waiting on.</p>
      </div>

      <div className="tab-row">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={BookMarked}
          title="Nothing here yet"
          description="Browse the catalogue to add books to this list."
        />
      ) : (
        list.map((b) => {
          const index = books.findIndex((x) => x.id === b.id)
          return (
            <div key={b.id} className="book-list-item">
              <div className="cover">
  {b.image ? (
    <img src={b.image} alt={b.title} />
  ) : (
    <span>{b.title}</span>
  )}
</div>

            
              <div className="info">
                <div className="ttl">{b.title}</div>
                <div className="meta">
                  {b.author} · {b.cat}
                </div>
              </div>
              {tab === 'borrowed' && (
                <>
                  <div className="due">
                    Due on
                    <span>{b.dueDate || '—'}</span>
                  </div>
                  <button className="btn-sm primary" onClick={() => returnBook(b.id)}>
                    Return
                  </button>
                </>
              )}
              {tab === 'reservations' && (
                <button className="btn-sm" onClick={() => cancelReservation(b.id)}>
                  Cancel
                </button>
              )}
              {tab === 'wishlist' && (
                <button className="btn-sm primary" onClick={() => borrowBook(b.id)}>
                  Borrow Now
                </button>
              )}
            </div>
          )
        })
      )}
    </section>
  )
}
