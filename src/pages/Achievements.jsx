const achievements = [
  { year: '1980', title: 'Started his career', description: 'Placeholder description of an early milestone.' },
  { year: '1990', title: 'Founded a small business', description: 'Placeholder description of a professional achievement.' },
  { year: '2005', title: 'Community recognition', description: 'Placeholder description of an award or contribution.' },
  { year: '2020', title: 'Retirement', description: 'Placeholder description of closing this chapter.' },
]

export default function Achievements() {
  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-3" />
        <h1 className="font-serif text-3xl text-ink">Life Achievements</h1>
      </div>

      <div className="relative pl-6 border-l-2 border-mist space-y-8">
        {achievements.map((item, i) => (
          <div
            key={item.year}
            className="relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
          >
            <span className="absolute -left-[1.95rem] top-1 w-3 h-3 rounded-full bg-moss border-2 border-parchment" />
            <p className="text-ember font-sans text-sm font-medium">{item.year}</p>
            <h2 className="font-serif text-xl text-ink mt-1">{item.title}</h2>
            <p className="text-ink/70 font-sans text-sm mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}