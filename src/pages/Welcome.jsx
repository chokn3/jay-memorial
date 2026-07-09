import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Welcome() {
  const [name, setName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot) {
      return
    }

    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter a name to continue.')
      return
    }

    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase
      .from('visits')
      .insert([{ visitor_name: trimmed }])

    setSubmitting(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    navigate('/about')
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      <span className="w-2.5 h-2.5 rounded-full bg-ember animate-pulse mb-6" />

      <h1 className="font-serif text-parchment text-3xl leading-snug">
        In Loving Memory of
        <br />
        Jay
      </h1>

      <p className="text-parchment/60 font-sans mt-3 mb-8 max-w-xs">
        Thank you for visiting. Please share your name below before entering.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
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
          placeholder="Your name, or your family's name"
          className="w-full rounded-lg px-4 py-3 bg-parchment/10 text-parchment placeholder-parchment/40 border border-parchment/20 focus:outline-none focus:border-ember font-sans"
        />

        {error && (
          <p className="text-ember text-sm mt-2 font-sans">{error}</p>
        )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-4 py-3 rounded-lg bg-moss text-parchment font-sans font-medium disabled:opacity-50"
      >
        {submitting ? 'Signing in...' : 'Enter'}
      </button>
      </form>

      <button
        onClick={() => navigate('/about')}
        className="mt-4 text-parchment/40 hover:text-parchment/70 font-sans text-xs transition-colors"
      >
        Just browsing? Continue without signing in
      </button>
    </div>
  )
}