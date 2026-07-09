export default function VideoModal({ src, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationFillMode: 'forwards' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-parchment/10 text-parchment flex items-center justify-center text-lg"
      >
        ✕
      </button>
      <video
        src={src}
        controls
        autoPlay
        className="max-w-full max-h-full rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}