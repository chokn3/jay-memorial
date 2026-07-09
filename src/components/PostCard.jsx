import { useState } from 'react'
import { supabase } from '../supabaseClient'

function formatTime(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
    <div className="bg-white border-b-8 border-parchment sm:border sm:border-mist sm:rounded-xl sm:mb-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-1">
        <div className="w-10 h-10 rounded-full bg-moss text-parchment font-serif flex items-center justify-center text-base shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-sans font-semibold text-ink text-sm leading-tight truncate">
            {post.name}
          </p>
          <p className="text-ink/45 font-sans text-xs">{formatTime(post.created_at)}</p>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="px-3.5 pt-1.5 pb-2 text-ink/85 font-sans text-[15px] leading-snug">
          {post.caption}
        </p>
      )}

      {/* Image, edge-to-edge like FB */}
      <img
        src={optimizedUrl(post.image_url)}
        alt={`Visit shared by ${post.name}`}
        className="w-full object-cover max-h-[520px]"
        loading="lazy"
      />

      {/* Like/comment count summary row */}
      {(post.likes_count > 0 || comments.length > 0) && (
        <div className="flex items-center justify-between px-3.5 pt-2 pb-1 text-xs font-sans text-ink/50">
          <span className="flex items-center gap-1">
            {post.likes_count > 0 && (
              <>
                <span className="w-4 h-4 rounded-full bg-ember flex items-center justify-center text-[10px]">
                  ❤
                </span>
                {post.likes_count}
              </>
            )}
          </span>
          {showComments && comments.length > 0 && (
            <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-mist mx-3.5" />

      {/* Action bar — full width, split evenly like FB */}
      <div className="flex items-stretch px-1">
        <button
          onClick={() => onToggleLike(post.id, isLiked)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 font-sans text-sm font-medium transition-colors ${
            isLiked ? 'text-ember' : 'text-ink/60 hover:bg-parchment'
          } rounded-lg`}
        >
          <span key={isLiked ? 'liked' : 'unliked'} className={isLiked ? 'animate-pop' : ''}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          Like
        </button>

        <button
          onClick={toggleComments}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 font-sans text-sm font-medium text-ink/60 hover:bg-parchment rounded-lg transition-colors"
        >
          💬 Comment
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-3.5 pb-3.5 pt-1">
          {loadingComments && (
            <p className="text-ink/40 font-sans text-xs py-2">Loading comments...</p>
          )}

          <ul className="space-y-2 mb-3">
            {comments.map((c) => (
              <li key={c.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-mist text-ink/60 font-serif flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {c.name.trim().charAt(0).toUpperCase()}
                </div>
                <div className="bg-parchment rounded-2xl px-3 py-1.5 max-w-[85%]">
                  <p className="font-sans text-xs font-semibold text-ink">{c.name}</p>
                  <p className="font-sans text-sm text-ink/80 leading-snug">{c.comment}</p>
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-moss text-parchment font-serif flex items-center justify-center text-xs shrink-0">
              ✎
            </div>
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Name"
              className="w-20 rounded-full px-3 py-1.5 bg-parchment border-none text-xs text-ink placeholder-ink/40 focus:outline-none focus:ring-1 focus:ring-moss font-sans shrink-0"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 min-w-0 rounded-full px-3 py-1.5 bg-parchment border-none text-sm text-ink placeholder-ink/40 focus:outline-none focus:ring-1 focus:ring-moss font-sans"
            />
            <button
              type="submit"
              disabled={submitting}
              className="text-moss font-sans font-semibold text-sm px-1 disabled:opacity-40 shrink-0"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  )
}