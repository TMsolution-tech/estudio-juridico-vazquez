'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Consulta } from '@/lib/types'

// El client se crea lazy: en SSR/prerender no hay env ni browser.
function sb() {
  return createClient()
}

export function AdminConsultas() {
  const [items, setItems] = useState<Consulta[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data } = await sb()
      .from('consultas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    setItems((data ?? []) as Consulta[])
    setLoading(false)
  }, [])

  useEffect(() => {
    Promise.resolve().then(load)
  }, [load])

  async function toggleLeida(c: Consulta) {
    await sb().from('consultas').update({ leida: !c.leida }).eq('id', c.id)
    load()
  }

  async function eliminar(id: string) {
    await sb().from('consultas').delete().eq('id', id)
    load()
  }

  const pendientes = items.filter((c) => !c.leida).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-tinta">
          Bandeja de consultas
        </h2>
        <span className="bg-oxblood px-2.5 py-0.5 text-[0.65rem] font-bold text-crema">
          {pendientes} sin leer
        </span>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-tinta-soft">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="border border-dashed border-linea py-14 text-center text-sm text-tinta-soft">
          Todavía no llegaron consultas desde el sitio.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((c) => (
            <article
              key={c.id}
              className={`border bg-papel p-5 ${
                c.leida ? 'border-linea opacity-70' : 'border-oxblood/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-tinta">
                    {c.nombre}
                    {!c.leida && (
                      <span className="ml-2 bg-oxblood px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-crema">
                        Nueva
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-tinta-soft">
                    <a href={`mailto:${c.email}`} className="hover:text-oxblood">
                      {c.email}
                    </a>
                    {c.telefono && (
                      <>
                        {' · '}
                        <a
                          href={`tel:${c.telefono}`}
                          className="hover:text-oxblood"
                        >
                          {c.telefono}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <p className="shrink-0 text-[0.68rem] text-tinta-soft/70">
                  {new Date(c.created_at).toLocaleString('es-AR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {c.asunto && (
                <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-oxblood">
                  {c.asunto}
                </p>
              )}
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-tinta-soft">
                {c.mensaje}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleLeida(c)}
                  className="border border-linea px-3 py-1.5 text-[0.68rem] font-bold text-tinta-soft transition hover:border-oxblood hover:text-oxblood"
                >
                  {c.leida ? 'Marcar sin leer' : 'Marcar leída'}
                </button>
                <button
                  onClick={() => eliminar(c.id)}
                  className="border border-linea px-3 py-1.5 text-[0.68rem] font-bold text-tinta-soft transition hover:border-red-700 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
