import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from '../components/PostCard'
import VisitorLogModal from '../components/VisitorLogModal'
import PostComposer from '../components/PostComposer'

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

      <PostComposer onPosted={fetchPosts} />

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