import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Bookmark } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/categories'
import { searchBooks, normalizeBook } from '../services/bookApi'
import BookModal from '../components/BookModal'
import EmptyState from '../components/EmptyState'

const CATEGORY_SEARCHES = {
  Fiction: 'fiction',
  'Non-Fiction': 'nonfiction',
  'Science & Tech': 'science technology',
  Business: 'business',
  'Self Help': 'self help',
  History: 'history',
  'Health & Fitness': 'health fitness',
  Biography: 'biography',
  'Arts & Culture': 'arts culture'
}

export default function Explore() {
  const { books, bookmarked, toggleBookmark, addBooks} = useApp()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeCat, setActiveCat] = useState(params.get('cat') || 'All')
  const [results, setResults] = useState(books)
  const [loading, setLoading] = useState(false)
  const [openBook, setOpenBook] = useState(null)

  useEffect(() => {
    setQuery(params.get('q') || '')
    setActiveCat(params.get('cat') || 'All')
  }, [params])

useEffect(() => {
  async function loadResults() {
    const searchQuery = params.get('q')?.trim() || ''

    // Home page search
    if (activeCat === 'All' && searchQuery) {
      try {
        setLoading(true)

        const data = await searchBooks(searchQuery)

        const normalizedBooks = data.map((book) =>
          normalizeBook(book)
        )

        addBooks(normalizedBooks)
        setResults(normalizedBooks)
      } catch (error) {
        console.error('Failed to search books:', error)
        setResults([])
      } finally {
        setLoading(false)
      }

      return
    }

    // Category search
    if (activeCat !== 'All') {
      const searchTerm = CATEGORY_SEARCHES[activeCat]

      if (!searchTerm) {
        setResults([])
        return
      }

      try {
        setLoading(true)

        const data = await searchBooks(searchTerm)

        const normalizedBooks = data.map((book) =>
          normalizeBook(book, activeCat)
        )

        addBooks(normalizedBooks)
        setResults(normalizedBooks)
      } catch (error) {
        console.error('Failed to load category books:', error)
        setResults([])
      } finally {
        setLoading(false)
      }

      return
    }

    // Normal Explore page
    setResults(books)
  }

  loadResults()
}, [activeCat, params])

  const q = query.toLowerCase().trim()

  const filteredResults = results.filter((b) => {
    return (
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.cat.toLowerCase().includes(q)
    )
  })

  function selectCat(name) {
    setActiveCat(name)

    setParams((p) => {
      const next = new URLSearchParams(p)

      if (name === 'All') {
        next.delete('cat')
      } else {
        next.set('cat', name)
      }

      return next
    })
  }

  return (
    <section className="page">
      <div className="page-head">
        <h1>Explore the catalogue</h1>
        <p className="sub">
          Browse or search every title in the library.
        </p>
      </div>

      <div className="explore-bar">
        <div className="explore-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search by title, author, subject or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="chip-row">
        {['All', ...CATEGORIES.map((c) => c.name)].map((c) => (
          <button
            key={c}
            className={`chip ${activeCat === c ? 'active' : ''}`}
            onClick={() => selectCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="result-count">
        {loading
          ? 'Loading books...'
          : `About ${filteredResults.length} result${
              filteredResults.length !== 1 ? 's' : ''
            } found`}
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Loading books...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matches found"
          description="Try a different title, author, or category."
        />
      ) : (
        filteredResults.map((b) => {
          const saved = bookmarked.has(b.id)

          return (
            <div
              key={b.id}
              className="result-row"
              onClick={() => setOpenBook(b)}
            >
              <div className="result-cover">
                {b.image ? (
                  <img src={b.image} alt={b.title} />
                ) : (
                  <span>
                    {b.title.split(' ').slice(0, 3).join(' ')}
                  </span>
                )}
              </div>

              <div className="result-mid">
                <div className="ttl">{b.title}</div>

                <div className="meta">{b.author}</div>

                <div className="meta">
                  {b.cat} · {b.year}
                </div>
              </div>

              <div className="result-right">
                {b.status === 'available' ? (
                  <span className="bk-badge avail">Available</span>
                ) : (
                  <span className="bk-badge out">Checked Out</span>
                )}

                <button
                  className={`bk-bookmark static ${
                    saved ? 'saved' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleBookmark(b.id)
                  }}
                  aria-label="Toggle bookmark"
                >
                  <Bookmark
                    fill={saved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </div>
          )
        })
      )}

      <BookModal
        book={openBook}
        onClose={() => setOpenBook(null)}
      />
    </section>
  )
}