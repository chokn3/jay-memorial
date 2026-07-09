import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function formatVisit(dateStr) {
  const date = new Date(dateStr)
  const dateLabel = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const timeLabel = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateLabel} · ${timeLabel}`
}

export default function VisitorLogModal({ onClose }) {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('visited_at', { ascending: false })

      if (error) setError('Could not load visitors right now.')
      else setVisits(data)
      setLoading(false)
    }
    fetchVisits()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />

      <div className="relative bg-parchment w-full sm:w-full sm:max-w-md max-h-[80vh] rounded-t-2xl sm:rounded-2xl p-6 overflow-y-auto animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-ink">Visitor Log</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink text-sm font-sans">
            Close
          </button>
        </div>

        {loading && <p className="text-center text-ink/50 font-sans text-sm">Loading visitors...</p>}
        {error && <p className="text-center text-ember font-sans text-sm">{error}</p>}
        {!loading && !error && visits.length === 0 && (
          <p className="text-center text-ink/50 font-sans text-sm">No visitors yet.</p>
        )}

        {!loading && !error && visits.length > 0 && (
          <ul className="space-y-3">
            {visits.map((visit) => (
              <li key={visit.id} className="bg-white/60 border border-mist rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="font-serif text-ink text-lg">{visit.visitor_name}</span>
                <span className="text-ink/50 font-sans text-xs whitespace-nowrap ml-4">
                  {formatVisit(visit.visited_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}