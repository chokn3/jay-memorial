const parents = [
  { name: 'Avelino Guevarra', relation: 'Father' },
  { name: 'Arsenia Guevarra', relation: 'Mother' },
]

const siblings = [
  { name: 'Lauro Guevarra', relation: 'Brother' },
  { name: 'Mhae Guevarra', relation: 'Sister' },
  { name: 'Raquel Guevarra Mangawang', relation: 'Sister' },
  { name: 'Rosalie Guevarra Gonzales', relation: 'Sister' },
]

const wife = { name: 'Racquel Guevarra', relation: 'Wife' }

const childCouples = [
  [
    { name: 'Jake Russel Guevarra', relation: 'Son' },
    { name: 'Deanne Maxinne Paloma', relation: 'Future Daughter-in-Law' },
  ],
  [
    { name: 'Jacque Rachel Labaguis', relation: 'Daughter' },
    { name: 'Aaron Jeoffrey Labaguis', relation: 'Son-in-Law' },
  ],
]

const grandchildren = [{ name: 'Ariana Labaguis', relation: 'Granddaughter' }]

const extended = [{ name: 'Ninang', relation: 'Aunt / Godmother' }]

function Avatar({ name, relation, highlight }) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div className="flex flex-col items-center text-center w-20">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-lg mb-1 ${
          highlight ? 'bg-ember text-ink ring-2 ring-ember ring-offset-2 ring-offset-parchment' : 'bg-moss text-parchment'
        }`}
      >
        {initial}
      </div>
      <p className="font-sans text-xs font-medium text-ink leading-tight">{name}</p>
      <p className="font-sans text-[11px] text-ink/50">{relation}</p>
    </div>
  )
}

function Connector() {
  return <div className="w-px h-6 bg-mist mx-auto" />
}

export default function FamilyTreeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />

      <div
        className="relative bg-parchment w-full sm:max-w-md max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col animate-fade-in-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist shrink-0">
          <h2 className="font-serif text-2xl text-ink">Family Tree</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink text-sm font-sans">
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {/* Parents */}
          <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">Parents</p>
          <div className="flex justify-center gap-6">
            {parents.map((p) => (
              <Avatar key={p.name} {...p} />
            ))}
          </div>

          <Connector />

          {/* Jay's generation */}
          <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">Jay's Generation</p>
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {siblings.slice(0, 2).map((p) => (
              <Avatar key={p.name} {...p} />
            ))}
            <Avatar name="Jay Guevarra" relation="In Loving Memory" highlight />
            {siblings.slice(2).map((p) => (
              <Avatar key={p.name} {...p} />
            ))}
          </div>

          <Connector />

          {/* Wife */}
          <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">Wife</p>
          <div className="flex justify-center">
            <Avatar {...wife} />
          </div>

          <Connector />

          {/* Children */}
          <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">
            Children &amp; Their Families
          </p>
          <div className="flex flex-col gap-5 mb-2">
            {childCouples.map((couple, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Avatar {...couple[0]} />
                <span className="text-ember text-lg mb-6">&amp;</span>
                <Avatar {...couple[1]} />
              </div>
            ))}
          </div>

          <Connector />

          {/* Grandchildren */}
          <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">Grandchildren</p>
          <div className="flex justify-center mb-6">
            {grandchildren.map((p) => (
              <Avatar key={p.name} {...p} />
            ))}
          </div>

          {/* Extended family */}
          <div className="border-t border-mist pt-4">
            <p className="text-center text-ink/40 font-sans text-xs uppercase tracking-wide mb-3">Extended Family</p>
            <div className="flex justify-center">
              {extended.map((p) => (
                <Avatar key={p.name} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}