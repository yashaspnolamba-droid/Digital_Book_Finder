import { BookMarked, Check, Bookmark } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ICONS = { borrowed: BookMarked, returned: Check, saved: Bookmark }

export default function HistoryPage() {
  const { historyLog } = useApp()

  return (
    <section className="page">
      <div className="page-head">
        <h1>History</h1>
        <p className="sub">A record of what you've borrowed, returned and saved.</p>
      </div>

      <div className="history-card">
        {historyLog.map((h, i) => {
          const Icon = ICONS[h.icon] || Check
          return (
            <div className="history-item" key={i}>
              <div className={`hist-ic ${h.icon}`}>
                <Icon />
              </div>
              <div className="txt">
                <b>{h.title}</b>
                <p>{h.sub}</p>
              </div>
              <div className="when">{h.when}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
