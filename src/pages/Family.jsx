const family = [
  { name: 'Racquel Guevarra', relation: 'Wife' },
  { name: 'Jake Russel Guevarra', relation: 'Son' },
  { name: 'Deanne Maxinne Paloma', relation: 'Future Daughter in Law' },
  { name: 'Jacque Rachel Labaguis', relation: 'Daughter' },
  { name: 'Aaron Jeoffrey Labaguis', relation: 'Son in Law' },
  { name: 'Arianna Labaguis', relation: 'Grandchild' },

  { name: 'Arsenia Guevarra', relation: 'Mother' },
  { name: 'Avelino Guevarra', relation: 'Father' },
  { name: 'Mhae Guevarra', relation: 'Sister' },
  { name: 'Raquel Guevarra Mangawang', relation: 'Sister' },
  { name: 'Rosalie Guevarra Gonzales', relation: 'Sister' },
  { name: 'Lauro Guevarra', relation: 'Brother' },
  { name: 'Ninang', relation: 'Aunt' },
]

export default function Family() {
  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Family</h1>
        <p className="text-ink/60 mt-2 font-sans text-sm">
          The people who loved him most.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {family.map((member, i) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
          >
            <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-2">
              <span className="text-ink/40 font-sans text-xs">Photo</span>
            </div>
            <p className="font-serif text-ink text-base">{member.name}</p>
            <p className="text-ink/50 font-sans text-xs">{member.relation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}