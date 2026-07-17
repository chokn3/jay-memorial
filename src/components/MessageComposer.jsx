import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function MessageComposer({ onPosted }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const resetForm = () => {
    setName('')
    setMessage('')
    setIsAnonymous(false)
    setError('')
  }

  const closeModal = () => {
    setOpen(false)
    resetForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) return

    if (!isAnonymous && !name.trim()) {
      setError('Please add your name, or choose to post anonymously.')
      return
    }
    if (!message.trim()) {
      setError('Please write a message before sending.')
      return
    }

    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase.from('messages').insert([
      {
        name: isAnonymous ? 'Someone that loves you' : name.trim(),
        message: message.trim(),
      },
    ])

    setSubmitting(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    closeModal()
    onPosted()
  }

  return (
    <>
      {/* Collapsed bar */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 bg-white/70 border border-mist rounded-2xl px-4 py-3.5 mb-8 text-left hover:bg-white transition-colors"
      >
        <span className="text-lg">✍️</span>
        <span className="text-ink/50 font-sans text-sm">
          Write something to Jay...
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-ink/60" onClick={closeModal} />

          <div
            className="relative bg-parchment w-full sm:max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col animate-fade-in-up"
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-mist shrink-0">
              <button onClick={closeModal} className="text-ink/50 hover:text-ink text-sm font-sans">
                Cancel
              </button>
              <h2 className="font-serif text-lg text-ink">Write to Jay</h2>
              <span className="w-12" />
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-4 space-y-3">
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                aria-hidden="true"
              />

              <p className="text-ink/50 font-sans text-xs leading-relaxed">
                Whatever's on your mind — a memory, something you miss, or
                just a few words. This is a space to say it.
              </p>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear Jay..."
                rows={6}
                autoFocus
                className="w-full rounded-lg px-3 py-2.5 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans resize-none"
              />

              {!isAnonymous && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg px-3 py-2.5 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
                />
              )}

              <label className="flex items-center gap-2 text-sm font-sans text-ink/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-moss"
                />
                Post anonymously
              </label>

              {error && <p className="text-ember text-sm font-sans">{error}</p>}
            </form>

            <div className="px-5 py-4 border-t border-mist shrink-0">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 rounded-lg bg-ink text-parchment font-sans font-medium disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send to Jay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}