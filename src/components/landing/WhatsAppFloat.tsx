'use client'

import { useState } from 'react'
import { CONTACTOS, whatsappUrl } from '@/lib/site'
import { WhatsAppIcon } from './Contacto'

// Botón flotante: abre un selector para hablar con Ariel o Mauricio.
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-fade-up w-60 border border-linea bg-papel p-4 shadow-2xl shadow-black/60">
          <p className="font-display mb-3 text-sm font-bold text-tinta">
            ¿Con quién querés hablar?
          </p>
          <div className="flex flex-col gap-2">
            {CONTACTOS.map((c) => (
              <a
                key={c.email}
                href={whatsappUrl(c)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-linea bg-noche-2 px-4 py-3 text-sm font-semibold text-tinta transition hover:border-[#25d366]/60 hover:bg-[#25d366]/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] text-white">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                {c.nombre}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 transition hover:scale-110"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <WhatsAppIcon className="h-7 w-7" />
        )}
      </button>
    </div>
  )
}
