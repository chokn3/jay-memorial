import { useState, useRef } from 'react'
import { supabase } from '../supabaseClient'

export default function PostComposer({ onPosted }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const resetForm = () => {
    setName('')
    setCaption('')
    setFile(null)
    setPreviewUrl(null)
    setError('')
  }

  const closeModal = () => {
    setOpen(false)
    resetForm()
  }

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) return

    if (!name.trim() || !file) {
      setError('Please add your name and a photo before sharing.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const uploadData = await uploadRes.json()
      if (!uploadData.secure_url) throw new Error('Upload failed')

      const { error: insertError } = await supabase.from('posts').insert([
        { name: name.trim(), caption: caption.trim() || null, image_url: uploadData.secure_url },
      ])
      if (insertError) throw insertError

      closeModal()
      onPosted()
    } catch (err) {
      setError('Something went wrong sharing your photo. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Collapsed bar */}
      <div className="bg-white border border-mist rounded-2xl p-3 mb-6 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0 text-ink/50 font-serif">
          +
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex-1 text-left rounded-full bg-parchment px-4 py-2.5 text-ink/50 font-sans text-sm hover:bg-mist/50 transition-colors"
        >
          Share a photo from your visit...
        </button>
        <button
          onClick={() => setOpen(true)}
          aria-label="Add photo"
          className="w-9 h-9 rounded-full bg-parchment flex items-center justify-center shrink-0 hover:bg-mist/50 transition-colors"
        >
          📷
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-ink/60" onClick={closeModal} />

          <div className="relative bg-parchment w-full sm:max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-mist shrink-0">
              <button onClick={closeModal} className="text-ink/50 hover:text-ink text-sm font-sans">
                Cancel
              </button>
              <h2 className="font-serif text-lg text-ink">Share Your Visit</h2>
              <span className="w-12" />
            </div>

            {/* Modal body, scrollable */}
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

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg px-3 py-2.5 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
              />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Say a few words about your visit..."
                rows={3}
                className="w-full rounded-lg px-3 py-2.5 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans resize-none"
              />

              {previewUrl ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full max-h-72 object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null)
                      setPreviewUrl(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/70 text-parchment text-sm flex items-center justify-center"
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-1.5 py-8 rounded-xl border-2 border-dashed border-mist text-ink/50 font-sans text-sm hover:border-moss hover:text-moss transition-colors"
                >
                  <span className="text-2xl">📷</span>
                  Add a photo
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileChange}
                className="hidden"
              />

              {error && <p className="text-ember text-sm font-sans">{error}</p>}
            </form>

            {/* Sticky footer button */}
            <div className="px-5 py-4 border-t border-mist shrink-0">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 rounded-lg bg-ink text-parchment font-sans font-medium disabled:opacity-50"
              >
                {submitting ? 'Sharing...' : 'Share Your Visit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}