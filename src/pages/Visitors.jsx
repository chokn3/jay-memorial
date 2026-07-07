import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function formatVisit(dateStr) {
  const date = new Date(dateStr)
  const dateLabel = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeLabel = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateLabel} · ${timeLabel}`
}

export default function Visitors() {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('visited_at', { ascending: false })

      if (error) {
        setError('Could not load visitors right now.')
      } else {
        setVisits(data)
      }
      setLoading(false)
    }

    fetchVisits()
  }, [])

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Visitors</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm">
          Everyone who has stopped by to remember Jay.
        </p>
      </div>

      {loading && (
        <p className="text-center text-ink/50 font-sans text-sm">Loading visitors...</p>
      )}

      {error && (
        <p className="text-center text-ember font-sans text-sm">{error}</p>
      )}

      {!loading && !error && visits.length === 0 && (
        <p className="text-center text-ink/50 font-sans text-sm">
          No visitors yet — be the first to sign in.
        </p>
      )}

      {!loading && !error && visits.length > 0 && (
        <ul className="space-y-3">
          {visits.map((visit, i) => (
            <li
              key={visit.id}
              className="bg-white/60 border border-mist rounded-xl px-4 py-3 flex items-center justify-between opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <span className="font-serif text-ink text-lg">{visit.visitor_name}</span>
              <span className="text-ink/50 font-sans text-xs whitespace-nowrap ml-4">
                {formatVisit(visit.visited_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}