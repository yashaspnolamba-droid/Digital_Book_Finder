import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { CATEGORIES } from '../data/categories'
import { getCategoryBookCount } from '../services/bookApi'

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

export default function Categories() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategoryCounts() {
      try {
        const results = await Promise.all(
          CATEGORIES.map(async (category) => {
            const searchTerm = CATEGORY_SEARCHES[category.name]
            const count = await getCategoryBookCount(searchTerm)

            return {
              name: category.name,
              count
            }
          })
        )

        const countMap = {}

        results.forEach((item) => {
          countMap[item.name] = item.count
        })

        setCounts(countMap)
      } catch (error) {
        console.error('Failed to load category counts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryCounts()
  }, [])

  return (
    <section className="page">
      <div className="page-head">
        <h1>Categories</h1>
        <p className="sub">
          Explore books by your favourite subjects.
        </p>
      </div>

      <div className="cat-grid">
        {CATEGORIES.map((c) => {
          const Icon = Icons[c.icon] || Icons.Book

          return (
            <div
              key={c.name}
              className="cat-card"
              onClick={() =>
                navigate(
                  `/app/explore?cat=${encodeURIComponent(c.name)}`
                )
              }
            >
              <div
                className="cat-ic"
                style={{
                  background: `${c.color}22`,
                  color: c.color
                }}
              >
                <Icon />
              </div>

              <div>
                <b>{c.name}</b>

                <span>
                  {loading
                    ? 'Loading...'
                    : `${counts[c.name] || 0} Books`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}