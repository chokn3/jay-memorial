import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from '../components/PostCard'
import VisitorLogModal from '../components/VisitorLogModal'

function getDeviceId() {
  let id = localStorage.getItem('jay_memorial_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('jay_memorial_device_id', id)
  }
  return id
}

export default function Visitors() {
  const [posts, setPosts] = useState([])
  const [likedPostIds, setLikedPostIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [showLog, setShowLog] = useState(false)

  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const deviceId = getDeviceId()

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, post_likes(count)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data.map((p) => ({ ...p, likes_count: p.post_likes?.[0]?.count || 0 })))
    }

    const { data: myLikes } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('device_id', deviceId)

    if (myLikes) {
      setLikedPostIds(new Set(myLikes.map((l) => l.post_id)))
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleToggleLike = async (postId, currentlyLiked) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes_count: p.likes_count + (currentlyLiked ? -1 : 1) } : p
      )
    )
    setLikedPostIds((prev) => {
      const next = new Set(prev)
      currentlyLiked ? next.delete(postId) : next.add(postId)
      return next
    })

    if (currentlyLiked) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('device_id', deviceId)
    } else {
      await supabase.from('post_likes').insert([{ post_id: postId, device_id: deviceId }])
    }
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
        {
          name: name.trim(),
          caption: caption.trim() || null,
          image_url: uploadData.secure_url,
        },
      ])

      if (insertError) throw insertError

      setName('')
      setCaption('')
      setFile(null)
      e.target.reset()
      fetchPosts()
    } catch (err) {
      setError('Something went wrong sharing your photo. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-2" />
          <h1 className="font-serif text-3xl text-ink">Visitors</h1>
        </div>
        <button
          onClick={() => setShowLog(true)}
          className="text-xs font-sans text-ink/60 border border-mist rounded-full px-3 py-1.5 hover:text-ink hover:border-ink/40 transition-colors whitespace-nowrap"
        >
          See list of visitors
        </button>
      </div>

      <p className="text-ink/60 font-sans text-sm mb-6">
        Share a photo from your visit, and see moments from others who came to remember him too.
      </p>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="bg-white/70 border border-mist rounded-2xl p-4 mb-8 space-y-3">
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
          className="w-full rounded-lg px-3 py-2 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Say a few words about your visit..."
          rows={2}
          className="w-full rounded-lg px-3 py-2 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans resize-none"
        />
        <input
          type="file"
          accept="image/*"
          capture="user"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm font-sans text-ink/70 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-moss file:text-parchment file:text-sm"
        />

        {error && <p className="text-ember text-sm font-sans">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-lg bg-ink text-parchment font-sans font-medium text-sm disabled:opacity-50"
        >
          {submitting ? 'Sharing...' : 'Share Your Visit'}
        </button>
      </form>

      {/* Feed */}
      {loading && <p className="text-center text-ink/50 font-sans text-sm">Loading memories...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-ink/50 font-sans text-sm">
          No memories shared yet — be the first to share your visit.
        </p>
      )}

      {!loading &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={likedPostIds.has(post.id)}
            onToggleLike={handleToggleLike}
          />
        ))}

      {showLog && <VisitorLogModal onClose={() => setShowLog(false)} />}
    </div>
  )
}