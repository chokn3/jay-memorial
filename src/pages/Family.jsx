import { useState } from 'react'
import FamilyTreeModal from '../components/FamilyTreeModal'
import Lightbox from '../components/Lightbox'
import { optimizedUrl } from '../utils/cloudinary'

// Add your Cloudinary photo URLs here, grouped by who's in the photo.
// Example: 'Wife': ['https://res.cloudinary.com/dgd7zzp5t/image/upload/v.../photo1.jpg']
const familyPhotos = {
  Wife: [],
  Son: [],
  Daughter: [],
  'Son-in-Law': [],
  Granddaughter: [],
  'Future Daughter-in-Law': [],
}

// Group photos with everyone together
const everyonePhotos = []

// Add Cloudinary video URLs here
const videos = []

function PhotoRow({ label, photos, onOpen }) {
  if (photos.length === 0) return null
  return (
    <div className="mb-6">
      <p className="font-sans text-sm font-medium text-ink/70 mb-2">{label}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((url, i) => (
          <button
            key={i}
            onClick={() => onOpen(url, label)}
            className="shrink-0 w-24 h-24 rounded-xl overflow-hidden"
          >
            <img src={optimizedUrl(url, 'w_200,h_200,c_fill,q_auto,f_auto')} alt={label} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Family() {
  const [showTree, setShowTree] = useState(false)
  const [tab, setTab] = useState('family')
  const [lightbox, setLightbox] = useState(null)

  const hasFamilyPhotos = Object.values(familyPhotos).some((arr) => arr.length > 0)

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-2" />
          <h1 className="font-serif text-3xl text-ink">Family</h1>
        </div>
        <button
          onClick={() => setShowTree(true)}
          className="text-xs font-sans text-ink/60 border border-mist rounded-full px-3 py-1.5 hover:text-ink hover:border-ink/40 transition-colors whitespace-nowrap"
        >
          See family tree
        </button>
      </div>

      <p className="text-ink/60 font-sans text-sm mb-6">
        Photos and moments with the people who loved him most.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'family', label: 'Family' },
          { key: 'everyone', label: 'Everyone' },
          { key: 'videos', label: 'Videos' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${
              tab === t.key ? 'bg-ink text-parchment' : 'bg-white/60 text-ink/60 border border-mist'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Family tab */}
      {tab === 'family' && (
        <div>
          {!hasFamilyPhotos && (
            <p className="text-center text-ink/50 font-sans text-sm py-8">
              No family photos added yet.
            </p>
          )}
          {Object.entries(familyPhotos).map(([label, photos]) => (
            <PhotoRow key={label} label={label} photos={photos} onOpen={(url) => setLightbox(url)} />
          ))}
        </div>
      )}

      {/* Everyone tab */}
      {tab === 'everyone' && (
        <div>
          {everyonePhotos.length === 0 ? (
            <p className="text-center text-ink/50 font-sans text-sm py-8">
              No group photos added yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {everyonePhotos.map((url, i) => (
                <button key={i} onClick={() => setLightbox(url)} className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={optimizedUrl(url, 'w_400,h_400,c_fill,q_auto,f_auto')}
                    alt="Family together"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Videos tab */}
      {tab === 'videos' && (
        <div>
          {videos.length === 0 ? (
            <p className="text-center text-ink/50 font-sans text-sm py-8">
              No videos added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {videos.map((url, i) => (
                <video key={i} controls className="w-full rounded-xl">
                  <source src={optimizedUrl(url, 'q_auto')} type="video/mp4" />
                </video>
              ))}
            </div>
          )}
        </div>
      )}

      {showTree && <FamilyTreeModal onClose={() => setShowTree(false)} />}
      {lightbox && <Lightbox src={optimizedUrl(lightbox)} alt="Family photo" onClose={() => setLightbox(null)} />}
    </div>
  )
}