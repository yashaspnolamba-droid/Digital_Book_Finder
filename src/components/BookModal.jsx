import { X, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function BookModal({ book, onClose }) {
  const { bookmarked, toggleBookmark,wishlist, toggleWishlist, borrowBook } = useApp()

  if (!book) return null

  const isSaved = bookmarked.has(book.id)
  const isWishlisted = wishlist.has(book.id)

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>

        <div className="modal-top">
          <div className="modal-cover">
            {book.image ? (
              <img src={book.image} alt={book.title} />
            ) : (
              <span>{book.title}</span>
            )}
          </div>

          <div className="modal-info">
            <h2>{book.title}</h2>

            <div className="au">{book.author}</div>

            <div className="meta">
              {book.cat} · {book.year}
            </div>

            <div className="modal-rate">
              <Star fill="currentColor" strokeWidth={0} />
              <span>Open Library</span>
            </div>

            <div style={{ marginTop: 12 }}>
              {book.status === 'available' ? (
                <span className="bk-badge avail">Available</span>
              ) : (
                <span className="bk-badge out">
                  Checked Out · Due {book.dueDate}
                </span>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => borrowBook(book.id)}
              >
                {book.status === 'available' ? 'Borrow Now' : 'Reserve'}
              </button>

              <button
                className="btn-outline"
                onClick={() => toggleWishlist(book.id)}
              >
                {isWishlisted ? 'In Wishlist ✓' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

        <div className="modal-desc">
          <b>About the book</b>
          <p>{book.description}</p>
        </div>

        <div className="modal-grid">
          <div>
            <span>Publisher</span>
            <b>Open Library</b>
          </div>

          <div>
            <span>Pages</span>
            <b>Not available</b>
          </div>

          <div>
            <span>Language</span>
            <b>English</b>
          </div>

          <div>
            <span>Year</span>
            <b>{book.year}</b>
          </div>
        </div>
      </div>
    </div>
  )
}

