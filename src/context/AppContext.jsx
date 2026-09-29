import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'

import { INITIAL_BOOKS } from '../data/books'
import { searchBooks, normalizeBook } from '../services/bookApi'

const AppContext = createContext(null)

const INITIAL_HISTORY = [
  { icon: 'borrowed', title: 'Borrowed "Atomic Habits"', sub: 'James Clear', when: '2 days ago' },
  { icon: 'saved', title: 'Bookmarked "Sapiens"', sub: 'Yuval Noah Harari', when: '3 days ago' },
  { icon: 'returned', title: 'Returned "Deep Work"', sub: 'Cal Newport', when: '1 week ago' },
  { icon: 'borrowed', title: 'Borrowed "Thinking, Fast and Slow"', sub: 'Daniel Kahneman', when: '2 weeks ago' },
  { icon: 'saved', title: 'Added "Sprint" to wishlist', sub: 'Jake Knapp', when: '3 weeks ago' }
]

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ first: 'Ada', last: 'Reader', email: 'ada@example.com' })

  const [books, setBooks] = useState(INITIAL_BOOKS)




  
useEffect(() => {
  async function loadBooks() {
    try {
      const results = await searchBooks('fiction')
      const normalizedBooks = results.map(normalizeBook).reverse()

      console.log('Books from API:', normalizedBooks)

      setBooks(normalizedBooks)
    } catch (error) {
      console.error('Failed to load books:', error)
    }
  }

  loadBooks()
}, [])




  const [bookmarked, setBookmarked] = useState(new Set([3, 6]))
  const [wishlist, setWishlist] = useState(new Set([4, 12]))
  const [reservations, setReservations] = useState(new Set([9]))
  const [historyLog, setHistoryLog] = useState(INITIAL_HISTORY)

  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const login = useCallback((email) => {
    setUser((u) => ({ ...u, email: email || u.email }))
    setIsAuthenticated(true)
  }, [])

  const signup = useCallback((first, last, email) => {
    setUser({ first: first || 'Ada', last: last || 'Reader', email: email || 'ada@example.com' })
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const updateProfile = useCallback((patch) => {
    setUser((u) => ({ ...u, ...patch }))
    showToast('Profile updated')
  }, [showToast])

  const toggleBookmark = useCallback((id) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      const book = books.find((b) => b.id === id)
      if (next.has(id)) {
        next.delete(id)
        showToast('Removed from bookmarks')
      } else {
        next.add(id)
        if (book) {
          setHistoryLog((h) => [{ icon: 'saved', title: `Bookmarked "${book.title}"`, sub: book.author, when: 'Just now' }, ...h])
        }
        showToast(book ? `Bookmarked "${book.title}"` : 'Bookmarked')
      }
      return next
    })
  }, [books, showToast])

  const borrowBook = useCallback((id) => {
    setBooks((prev) => {
      const book = prev.find((b) => b.id === id)
      if (!book) return prev
      if (book.status === 'checked_out') {
        setReservations((r) => new Set(r).add(id))
        showToast(`Reserved "${book.title}"`)
        return prev
      }
      setHistoryLog((h) => [{ icon: 'borrowed', title: `Borrowed "${book.title}"`, sub: book.author, when: 'Just now' }, ...h])
      showToast(`Borrowed "${book.title}"`)
      return prev.map((b) => (b.id === id ? { ...b, status: 'checked_out', dueDate: 'In 14 days' } : b))
    })
    setWishlist((w) => {
      const next = new Set(w)
      next.delete(id)
      return next
    })
  }, [showToast])

  const returnBook = useCallback((id) => {
    setBooks((prev) => {
      const book = prev.find((b) => b.id === id)
      if (book) {
        setHistoryLog((h) => [{ icon: 'returned', title: `Returned "${book.title}"`, sub: book.author, when: 'Just now' }, ...h])
        showToast(`Returned "${book.title}"`)
      }
      return prev.map((b) => (b.id === id ? { ...b, status: 'available', dueDate: undefined } : b))
    })
  }, [showToast])

  const cancelReservation = useCallback((id) => {
    setReservations((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    showToast('Reservation cancelled')
  }, [showToast])

  const addBooks = useCallback((newBooks) => {
  setBooks((prev) => {
    const existingIds = new Set(prev.map((book) => book.id))

    const uniqueNewBooks = newBooks.filter(
      (book) => !existingIds.has(book.id)
    )

    return [...prev, ...uniqueNewBooks]
  })
}, [])

const toggleWishlist = useCallback((id) => {
  setWishlist((prev) => {
    const next = new Set(prev)

    if (next.has(id)) {
      next.delete(id)
      showToast('Removed from wishlist')
    } else {
      next.add(id)
      const book = books.find((b) => b.id === id)
      showToast(book ? `Added "${book.title}" to wishlist` : 'Added to wishlist')
    }

    return next
  })
}, [books, showToast])

const value = useMemo(
  () => ({
    isAuthenticated,
    user,
    books,
    bookmarked,
    wishlist,
    reservations,
    historyLog,
    toast,
    login,
    signup,
    logout,
    updateProfile,
    toggleWishlist,
    toggleBookmark,
    borrowBook,
    returnBook,
    cancelReservation,
    showToast,
    addBooks
  }),
  [
    isAuthenticated,
    user,
    books,
    bookmarked,
    wishlist,
    reservations,
    historyLog,
    toast,
    login,
    signup,
    logout,
    updateProfile,
    toggleBookmark,
    borrowBook,
    returnBook,
    cancelReservation,
    showToast,
    addBooks
  ]
)

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
