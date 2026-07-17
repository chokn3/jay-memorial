export default function About() {
  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="flex flex-col items-center text-center opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <div className="w-32 h-32 rounded-full overflow-hidden mb-5">
          <img
            src="https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783382765/IMG_8886_tavzdg.jpg"
            alt="Jay Dela Cruz"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-serif text-3xl text-ink">Jay Lumbang Guevarra</h1>
        <p className="text-ink/50 font-sans text-sm mt-1">1976 — 2026</p>
      </div>

      <div
        className="mt-8 space-y-4 text-ink/80 font-sans leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: '120ms', animationFillMode: 'forwards' }}
      >
        <p>
          Jay was a devoted husband, father, and friend whose warmth touched
          everyone who knew him. He believed in showing up — for his family,
          for his community, and for the small everyday moments that quietly
          make up a life well lived.
        </p>
        <p>
          Those who knew him remember his patience, his quick sense of humor,
          and the steady, quiet strength he carried through every season of
          life. This space is a small way of keeping his memory close.
        </p>
      </div>

      <blockquote
        className="mt-8 border-l-2 border-ember pl-4 italic text-ink/70 font-serif text-lg opacity-0 animate-fade-in-up"
        style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}
      >
        "Wag magtitipid sa pagkain."
      </blockquote>
    </div>
  )
}