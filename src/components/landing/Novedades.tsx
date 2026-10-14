import type { Novedad } from '@/lib/types'

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function Novedades({ novedades }: { novedades: Novedad[] }) {
  return (
    <section id="novedades" className="border-y border-linea bg-papel py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oxblood">
          <span className="h-0.5 w-7 bg-oxblood" />
          Actualidad
        </p>
        <h2 className="font-display mb-12 text-4xl font-bold text-tinta sm:text-5xl">
          Novedades
        </h2>

        {novedades.length === 0 ? (
          <p className="border border-dashed border-linea py-16 text-center text-sm text-tinta-soft">
            No hay novedades publicadas por el momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {novedades.map((n) => (
              <article
                key={n.id}
                className="group overflow-hidden border border-linea bg-marfil transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
              >
                {n.imagen_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={n.imagen_url}
                    alt={n.titulo}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-oxblood">
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
