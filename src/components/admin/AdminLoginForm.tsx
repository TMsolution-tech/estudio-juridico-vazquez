'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const inputCls =
  'w-full border border-linea-noche bg-noche px-4 py-3 text-sm text-crema outline-none transition focus:border-oro'

export function AdminLoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const data = new FormData(e.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get('email')),
      password: String(data.get('password')),
    })
    setLoading(false)
    if (error) {
      setError('Credenciales incorrectas.')
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-2.5 text-xs text-red-300">
          {error}
        </p>
      )}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={inputCls}
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Contraseña"
        className={inputCls}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-oxblood py-3 text-xs font-bold uppercase tracking-widest text-crema transition hover:bg-vino disabled:opacity-50"
      >
        {loading ? 'Ingresando…' : 'Ingresar'}
      </button>
    </form>
  )
}
