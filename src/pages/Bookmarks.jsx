import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import EmptyState from '../components/EmptyState'

export default function Bookmarks() {
  const { books, bookmarked } = useApp()
  const [openBook, setOpenBook] = useState(null)

  const saved = books.filter((b) => bookmarked.has(b.id))

  return (
    <section className="page">
      <div className="page-head">
        <h1>Bookmarks</h1>
        <p className="sub">Titles you've saved to come back to.</p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Tap the bookmark icon on any book to save it here."
        />
      ) : (
        <div className="book-grid">
         {saved.map((b) => (
  <BookCard
    key={b.id}
    book={b}
    onOpen={setOpenBook}
  />
))}
        </div>
      )}

      <BookModal bookId={openBook} onClose={() => setOpenBook(null)} />
    </section>
  )
}
