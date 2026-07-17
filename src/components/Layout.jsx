import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/about', label: 'About Jay' },
  { to: '/achievements', label: 'Life Achievements' },
  { to: '/family', label: 'Family' },
  { to: '/visitors', label: 'Visitors' },
  { to: '/death', label: 'Passing' },
  { to: '/message', label: 'Leave a Message' },
  { to: '/playlist', label: "Jay's Playlist" },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-parchment font-sans">
      <header className="flex items-center justify-between px-5 py-4 bg-ink text-parchment sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="font-serif text-lg tracking-wide">In Memory of Jay</span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2">
          <div className="w-6 h-0.5 bg-parchment mb-1.5" />
          <div className="w-6 h-0.5 bg-parchment mb-1.5" />
          <div className="w-6 h-0.5 bg-parchment" />
        </button>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/60 z-30 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <nav
        className={`fixed right-0 top-0 h-full w-64 bg-parchment shadow-xl p-6 flex flex-col gap-1 z-40 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end mb-4 text-ink/60 text-sm hover:text-ink transition-colors"
        >
          Close
        </button>
        {links.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `font-serif text-lg py-2 border-b border-mist transition-colors duration-200 ${
                isActive ? 'text-moss' : 'text-ink hover:text-moss'
              }`
            }
            style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}