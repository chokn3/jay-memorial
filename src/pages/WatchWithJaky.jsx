import { getYouTubeId } from '../utils/youtube'

// Add Jay's favorite YouTube videos here — just paste the normal video link,
// any format works (youtube.com/watch?v=..., youtu.be/..., etc.)
const videos = [
  { title: 'Pepito Manaloto Episode 200', url: 'https://www.youtube.com/watch?v=M4-qQ4k8KNg&t=815s&pp=ygUgcGVwaXRvIG1hbmFsb3RvIGZ1bGwgZXBpc29kZSBvbGQ%3D' },
  { title: 'Pepito Manaloto Episode 205', url: 'https://www.youtube.com/watch?v=M_rimG2Z234&t=23s&pp=ygUgcGVwaXRvIG1hbmFsb3RvIGZ1bGwgZXBpc29kZSBvbGQ%3D' },
  { title: 'Pepito Manaloto Episode 283', url: 'https://www.youtube.com/watch?v=0o0YBBCKXZc&pp=ygUgcGVwaXRvIG1hbmFsb3RvIGZ1bGwgZXBpc29kZSBvbGQ%3D' },
]

export default function WatchWithJay() {
  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Watch with Jay</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm max-w-xs mx-auto">
          A few of his favorite videos — sit back and watch them the way he did.
        </p>
      </div>

      {videos.length === 0 ? (
        <p className="text-center text-ink/50 font-sans text-sm py-8">
          No videos added yet.
        </p>
      ) : (
        <div className="space-y-6">
          {videos.map((video, i) => {
            const videoId = getYouTubeId(video.url)
            if (!videoId) return null

            return (
              <div
                key={i}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-video rounded-xl overflow-hidden border border-mist bg-ink">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {video.title && (
                  <p className="font-sans text-sm text-ink/80 mt-2 px-1">{video.title}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}