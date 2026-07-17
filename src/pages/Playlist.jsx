import { useState, useRef, useEffect } from 'react'

// Add Jay's favorite songs here — upload MP3s to Cloudinary as "video" resource type,
// copy the .mp3 URL, and drop it in below.
const songs = [
  { title: 'Bahay Yugyugan', artist: 'Flow G & Gloc-9', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784325801/Gloc-9_feat._Flow_G_-_Bahay_Yugyugan_Official_Lyric_Video_titw0r.mp3' },
  { title: 'RAPSTAR', artist: 'Flow G', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326030/FLOW_G_-_RAPSTAR_Official_Music_Video_qskduy.mp3' },
  { title: 'Batugan', artist: 'Flow G', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326061/BATUGAN_-_FLOW_G_OFFICIAL_MUSIC_VIDEO_vkjad1.mp3' },
  { title: 'G WOLF', artist: 'Flow G', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326122/G_WOLF_-_FLOW_G_Official_Music_Video_b2e32y.mp3' },
  { title: 'Ibong Adarna', artist: 'Flow G & Gloc-9', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326242/Flow_G_-_Ibong_Adarna_Ft._Gloc-9_Official_Music_Video_bqtunr.mp3' },
  { title: 'Bakit ngayon ka lang', artist: 'Juan Thugz n Harmony', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326272/JuanThugs_n_Harmony_-_Bakit_Ngayon_Ka_Lang_Lyrics_LIVE_on_Wish_107.5_Bus_timlyrics_b0qfax.mp3' },
  { title: 'Sa Susunod na lang', artist: 'Skusta Clee', url: 'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1784326661/Sa_Susunod_Na_Lang_LYRIC_VIDEO_-_Skusta_Clee_ft._Yuri_Prod._by_Flip-D_nu8934.mp3' },
]

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function Playlist() {
  const [currentIndex, setCurrentIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const currentSong = currentIndex !== null ? songs[currentIndex] : null

  useEffect(() => {
    if (currentIndex !== null && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentIndex])

  const playSong = (index) => {
    if (index === currentIndex) {
      togglePlayPause()
    } else {
      setCurrentIndex(index)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const playNext = () => {
    if (currentIndex === null) return
    const next = (currentIndex + 1) % songs.length
    setCurrentIndex(next)
  }

  const playPrev = () => {
    if (currentIndex === null) return
    const prev = (currentIndex - 1 + songs.length) % songs.length
    setCurrentIndex(prev)
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    const value = Number(e.target.value)
    audioRef.current.currentTime = value
    setProgress(value)
  }

  return (
    <div className="px-6 py-10 max-w-lg mx-auto pb-32">
      <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Jay's Playlist</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm">
          Songs he loved, kept here to listen to and remember him by.
        </p>
      </div>

      {songs.length === 0 ? (
        <p className="text-center text-ink/50 font-sans text-sm py-8">
          No songs added yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {songs.map((song, i) => {
            const isActive = i === currentIndex
            return (
              <li key={i}>
                <button
                  onClick={() => playSong(i)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
                    isActive ? 'bg-moss/10 border-moss' : 'bg-white/60 border-mist hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-sans text-sm ${
                      isActive && isPlaying ? 'bg-ember text-ink' : 'bg-moss text-parchment'
                    }`}
                  >
                    {isActive && isPlaying ? '❚❚' : '▶'}
                  </div>
                  <div className="text-left min-w-0">
                    <p className={`font-sans text-sm font-medium truncate ${isActive ? 'text-moss' : 'text-ink'}`}>
                      {song.title}
                    </p>
                    <p className="font-sans text-xs text-ink/50 truncate">{song.artist}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {/* Sticky Now Playing bar */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-ink text-parchment px-4 py-3 z-30 shadow-2xl">
          <audio
            ref={audioRef}
            src={currentSong.url}
            onTimeUpdate={(e) => setProgress(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onEnded={playNext}
          />

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 mb-2 accent-ember"
          />

          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-sans text-sm font-medium truncate">{currentSong.title}</p>
              <p className="font-sans text-xs text-parchment/50 truncate">
                {formatTime(progress)} / {formatTime(duration)}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 ml-3">
              <button onClick={playPrev} className="text-parchment/70 hover:text-parchment text-lg" aria-label="Previous">
                ⏮
              </button>
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-ember text-ink flex items-center justify-center text-base"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <button onClick={playNext} className="text-parchment/70 hover:text-parchment text-lg" aria-label="Next">
                ⏭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}