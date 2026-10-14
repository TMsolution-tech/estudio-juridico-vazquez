import { SITE } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-noche py-14 text-crema-soft">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Vazquez Estudio Penal"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-wide text-crema">
              Vazquez <span className="text-oro">Estudio Penal</span>
            </p>
            <p className="mt-1 text-xs">{SITE.direccion}</p>
          </div>
        </div>
        <nav className="flex gap-6 text-xs">
          <a href="#inicio" className="transition hover:text-oro">Inicio</a>
          <a href="#servicios" className="transition hover:text-oro">Servicios</a>
          <a href="#novedades" className="transition hover:text-oro">Novedades</a>
          <a href="#contacto" className="transition hover:text-oro">Contacto</a>
        </nav>
        <p className="text-xs">
          © {new Date().getFullYear()} Vazquez Estudio Penal. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
