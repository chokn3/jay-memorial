import { useState } from 'react'
import { supabase } from '../supabaseClient'

function formatTime(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function optimizedUrl(url) {
  return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/')
}

export default function PostCard({ post, isLiked, onToggleLike }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    setLoadingComments(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true })

    if (!error) setComments(data)
    setLoadingComments(false)
  }

  const toggleComments = () => {
    const next = !showComments
    setShowComments(next)
    if (next && comments.length === 0) fetchComments()
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentName.trim() || !commentText.trim()) return

    setSubmitting(true)
    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: post.id, name: commentName.trim(), comment: commentText.trim() }])

    setSubmitting(false)
    if (!error) {
      setCommentText('')
      fetchComments()
    }
  }

  const initial = post.name.trim().charAt(0).toUpperCase()

  return (
    <div className="bg-white/70 border border-mist rounded-2xl overflow-hidden mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="w-9 h-9 rounded-full bg-moss text-parchment font-serif flex items-center justify-center text-sm">
          {initial}
        </div>
        <div>
          <p className="font-serif text-ink text-base leading-tight">{post.name}</p>
          <p className="text-ink/50 font-sans text-xs">{formatTime(post.created_at)}</p>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="px-4 pt-3 text-ink/80 font-sans text-sm leading-relaxed">{post.caption}</p>
      )}

      {/* Image */}
      <img
        src={optimizedUrl(post.image_url)}
        alt={`Visit shared by ${post.name}`}
        className="w-full mt-3 object-cover max-h-[480px]"
        loading="lazy"
      />

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 py-3">
        <button
          onClick={() => onToggleLike(post.id, isLiked)}
          className="flex items-center gap-1.5 font-sans text-sm text-ink/70 hover:text-ember transition-colors"
        >
          <span key={isLiked ? 'liked' : 'unliked'} className={isLiked ? 'animate-pop' : ''}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          {post.likes_count > 0 ? post.likes_count : ''} {post.likes_count === 1 ? 'Like' : 'Likes'}
        </button>

        <button
          onClick={toggleComments}
          className="font-sans text-sm text-ink/70 hover:text-moss transition-colors"
        >
          💬 Comment
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-mist/60 pt-3">
          {loadingComments && (
            <p className="text-ink/40 font-sans text-xs">Loading comments...</p>
          )}

          {!loadingComments && comments.length === 0 && (
            <p className="text-ink/40 font-sans text-xs mb-2">No comments yet.</p>
          )}

          <ul className="space-y-2 mb-3">
            {comments.map((c) => (
              <li key={c.id} className="font-sans text-sm">
                <span className="text-ink font-medium">{c.name}</span>{' '}
                <span className="text-ink/70">{c.comment}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddComment} className="flex flex-col gap-2">
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your name"
              className="rounded-lg px-3 py-2 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 rounded-lg px-3 py-2 bg-white border border-mist text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-moss font-sans"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 rounded-lg bg-moss text-parchment text-sm font-sans disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}