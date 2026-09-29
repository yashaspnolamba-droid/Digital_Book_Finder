import { Bookmark } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function BookCard({ book, onOpen }) {
  const { bookmarked, toggleBookmark } = useApp()
  const isSaved = bookmarked.has(book.id)

  return (
    <div className="book-card" onClick={() => onOpen(book)}>
      <button
        className={`bk-bookmark ${isSaved ? 'saved' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          toggleBookmark(book.id)
        }}
        aria-label="Toggle bookmark"
      >
        <Bookmark fill={isSaved ? 'currentColor' : 'none'} />
      </button>

      <div className="book-cover">
  {book.image ? (
    <img src={book.image} alt={book.title} />
  ) : (
    <>
      <div className="stripe" />
      <div className="bt">{book.title}</div>
    </>
  )}
</div>

      
      <div className="bk-body">
        <div className="ttl">{book.title}</div>
        <div className="au">{book.author}</div>
        {book.status === 'available' ? (
          <span className="bk-badge avail">Available</span>
        ) : (
          <span className="bk-badge out">Checked Out</span>
        )}
      </div>
    </div>
  )
}
