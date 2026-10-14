'use client'

import { useState } from 'react'
import { SITE, WHATSAPP_URL } from '@/lib/site'
import { CONSULTA_ASUNTOS } from '@/lib/types'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const inputCls =
  'w-full border border-linea bg-papel px-4 py-3 text-sm text-tinta outline-none transition focus:border-oxblood focus:ring-2 focus:ring-oxblood/10'
const labelCls =
  'text-[0.65rem] font-bold uppercase tracking-[0.14em] text-tinta-soft'

const INFO = [
  {
    label: 'Email',
    value: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,
    icon: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  },
  {
    label: 'Teléfono',
    value: <a href={`tel:${SITE.telefonoIntl}`}>{SITE.telefono}</a>,
    icon: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  },
  {
    label: 'Dirección',
    value: SITE.direccion,
    icon: (
      <>
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: 'Horario de atención',
    value: SITE.horario,
    icon: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
]

export function Contacto() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    try {
      const res = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      form.reset()
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2">
        {/* Formulario */}
        <div>
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oxblood">
            <span className="h-0.5 w-7 bg-oxblood" />
            Consulta
          </p>
          <h2 className="font-display mb-3 text-3xl font-bold text-tinta sm:text-4xl">
            Envíe su consulta
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-tinta-soft">
            Completá el formulario y nos comunicamos a la brevedad para
            asesorarte. Toda la información es tratada con confidencialidad.
          </p>

          {status === 'ok' && (
            <p className="mb-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Mensaje enviado correctamente. Nos pondremos en contacto a la
              brevedad.
            </p>
          )}
          {status === 'error' && (
            <p className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Hubo un error al enviar. Por favor intentá nuevamente o
              contactanos por WhatsApp.
            </p>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nombre" className={labelCls}>
                  Nombre completo *
                </label>
                <input id="nombre" name="nombre" required className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefono" className={labelCls}>
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej: 387 123-4567"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelCls}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="su@email.com"
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="asunto" className={labelCls}>
                Asunto
              </label>
              <select id="asunto" name="asunto" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Seleccionar motivo de consulta
                </option>
                {CONSULTA_ASUNTOS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mensaje" className={labelCls}>
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                placeholder="Describí brevemente tu situación…"
                className={`${inputCls} resize-y`}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start bg-oxblood px-9 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-crema transition hover:bg-vino disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
            </button>
          </form>
        </div>

        {/* Info de contacto */}
        <div>
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oxblood">
            <span className="h-0.5 w-7 bg-oxblood" />
            Contacto
          </p>
          <h2 className="font-display mb-8 text-3xl font-bold text-tinta sm:text-4xl">
            Contacto directo
          </h2>

          <div className="mb-8 flex flex-col gap-5">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-oxblood text-crema">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-tinta-soft">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-tinta [&_a:hover]:text-oxblood">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border border-linea bg-papel p-6">
            <div>
              <p className="font-display text-lg font-bold text-tinta">
                ¿Prefiere WhatsApp?
              </p>
              <p className="mt-1 text-sm text-tinta-soft">
                Escribinos directamente y respondemos a la brevedad.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#1da551]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escribir
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  )
}
