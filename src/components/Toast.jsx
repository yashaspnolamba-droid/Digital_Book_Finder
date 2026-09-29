import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div className={`toast ${toast ? 'show' : ''}`}>
      <Check />
      <span>{toast}</span>
    </div>
  )
}
