'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminNovedades } from './AdminNovedades'
import { AdminConsultas } from './AdminConsultas'

type Tab = 'novedades' | 'consultas'

export function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('novedades')

  async function logout() {
    await createClient().auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-linea-noche bg-noche px-5 py-3 sm:px-8">
        <p className="font-display flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-crema">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            className="h-8 w-8 rounded-full"
          />
          Estudio Penal <span className="text-oro">Vazquez</span>
          <span className="ml-1 bg-oxblood px-2 py-0.5 text-[0.6rem] tracking-widest text-crema">
            Backoffice
          </span>
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-crema-soft hover:text-oro">
            ← Ver sitio
          </Link>
          <button
            onClick={logout}
            className="border border-linea-noche px-3 py-1.5 text-xs text-crema-soft transition hover:border-oro hover:text-oro"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex gap-2 border-b border-linea">
          {(
            [
              ['novedades', 'Novedades'],
              ['consultas', 'Consultas recibidas'],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition ${
                tab === key
                  ? 'border-oxblood text-oxblood'
                  : 'border-transparent text-tinta-soft hover:text-tinta'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'novedades' ? <AdminNovedades /> : <AdminConsultas />}
      </div>
    </div>
  )
}
