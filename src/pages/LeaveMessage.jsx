import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import MessageComposer from '../components/MessageComposer'

function formatTime(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LeaveMessage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Leave a Message</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm max-w-xs mx-auto">
          A quiet place to speak to Jay — share a memory, something you
          miss, or whatever's on your heart.
        </p>
      </div>

      <MessageComposer onPosted={fetchMessages} />

      {loading && (
        <p className="text-center text-ink/50 font-sans text-sm">Loading messages...</p>
      )}

      {!loading && messages.length === 0 && (
        <p className="text-center text-ink/50 font-sans text-sm">
          No messages yet — be the first to write to him.
        </p>
      )}

      <ul className="space-y-3">
        {messages.map((m, i) => (
          <li
            key={m.id}
            className="relative bg-white/70 border border-mist rounded-2xl px-5 py-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
          >
            <span className="absolute top-3 left-4 text-ember/30 font-serif text-3xl leading-none select-none">
              "
            </span>
            <p className="text-ink/85 font-serif text-[15px] leading-relaxed italic pt-3 pl-2">
              {m.message}
            </p>
            <div className="flex items-center justify-between mt-3 pl-2">
              <p className="text-ink font-sans text-xs font-medium">
                — {m.name}
              </p>
              <p className="text-ink/40 font-sans text-[11px]">
                {formatTime(m.created_at)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}