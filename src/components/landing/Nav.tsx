'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#novedades', label: 'Novedades' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-linea bg-noche/90 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-noche/70 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-oro/40 bg-oro/10 transition group-hover:bg-oro/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-oro"
            >
              <path d="M12 3v18M8 21h8" />
              <path d="M4 7h16" />
              <path d="M6 7l-3 7h6l-3-7M18 7l-3 7h6l-3-7" />
              <path d="M3 14a3 3 0 0 0 6 0M15 14a3 3 0 0 0 6 0" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-oro">
              Vazquez
            </span>
            <span className="font-display block text-base font-bold uppercase tracking-wide text-crema">
              Estudio Penal
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-crema/80 transition hover:text-oro"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-oro transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-oxblood px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-crema transition hover:bg-vino"
          >
            Consultar ahora
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-crema md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-linea bg-noche/95 px-4 pb-6 pt-2 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-linea py-3 text-sm font-medium text-crema"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 block bg-oxblood px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-crema"
          >
            Consultar ahora
          </a>
        </nav>
      )}
    </header>
  )
}
