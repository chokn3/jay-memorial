export default function Death() {
  return (
    <div className="px-6 py-10 max-w-lg mx-auto text-center">
      <div className="opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-4" />
        <h1 className="font-serif text-3xl text-ink">In Peaceful Rest</h1>
        <p className="text-ink/60 font-sans text-sm mt-3">
          June 25, 2026
        </p>
      </div>

      <div
        className="mt-8 space-y-4 text-ink/80 font-sans leading-relaxed text-left opacity-0 animate-fade-in-up"
        style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
      >
        <p>
          Jay passed away on June 25, 2026, surrounded by the love of his family.
        </p>
        <p>
          He now rests at Mary Help Memorial Garden in Arayat, Pampanga, a place
          his family and loved ones visit to remember and reflect.
        </p>
      </div>
    </div>
  )
}