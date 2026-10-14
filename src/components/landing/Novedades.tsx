import type { Novedad } from '@/lib/types'
import { Reveal } from '@/components/Reveal'

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function Novedades({ novedades }: { novedades: Novedad[] }) {
  return (
    <section id="novedades" className="border-t border-linea bg-papel py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oro">
            <span className="h-0.5 w-7 bg-oro" />
            Actualidad
          </p>
          <h2 className="font-display mb-12 text-4xl font-bold text-tinta sm:text-5xl">
            Novedades
          </h2>
        </Reveal>

        {novedades.length === 0 ? (
          <p className="border border-dashed border-linea py-16 text-center text-sm text-tinta-soft">
            No hay novedades publicadas por el momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {novedades.map((n, i) => (
              <Reveal key={n.id} delay={(i % 3) * 100}>
                <article className="group h-full overflow-hidden border border-linea bg-noche-2 transition-all duration-300 hover:-translate-y-1 hover:border-oro/40 hover:shadow-2xl hover:shadow-black/50">
                  {n.imagen_url && (
                    <div className="h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={n.imagen_url}
                        alt={n.titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-oro">
                      {n.categoria}
                    </p>
                    <h3 className="font-display mb-3 text-lg font-bold leading-snug text-tinta">
                      {n.titulo}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-tinta-soft">
                      {n.texto}
                    </p>
                    <p className="border-t border-linea pt-3 text-[0.7rem] tracking-wide text-tinta-soft/70">
                      {formatFecha(n.created_at)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
