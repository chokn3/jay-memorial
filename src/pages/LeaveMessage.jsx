import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function LeaveMessage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot) {
      return
    }

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both your name and a message.')
      return
    }

    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase
      .from('messages')
      .insert([{ name: name.trim(), message: message.trim() }])

    setSubmitting(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setName('')
    setMessage('')
    fetchMessages()
  }

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Leave a Message</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm">
          Share a memory or a few words for the family.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-10">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex="-1"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          aria-hidden="true"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg px-4 py-3 bg-white/60 border border-mist text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          rows={4}
          className="w-full rounded-lg px-4 py-3 bg-white/60 border border-mist text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans resize-none"
        />

        {error && <p className="text-ember text-sm font-sans">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-moss text-parchment font-sans font-medium disabled:opacity-50 transition-opacity"
        >
          {submitting ? 'Posting...' : 'Post Message'}
        </button>
      </form>

      {loading && (
        <p className="text-center text-ink/50 font-sans text-sm">Loading messages...</p>
      )}

      {!loading && messages.length === 0 && (
        <p className="text-center text-ink/50 font-sans text-sm">
          No messages yet — be the first to share one.
        </p>
      )}

      <ul className="space-y-3">
        {messages.map((m, i) => (
          <li
            key={m.id}
            className="bg-white/60 border border-mist rounded-xl px-4 py-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
          >
            <p className="text-ink/80 font-sans text-sm leading-relaxed">{m.message}</p>
            <p className="text-ink/50 font-sans text-xs mt-2">— {m.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}