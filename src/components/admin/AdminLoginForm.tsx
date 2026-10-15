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
  const [showPassword, setShowPassword] = useState(false)

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
      setError(error.message || 'Credenciales incorrectas.')
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
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          placeholder="Contraseña"
          className={`${inputCls} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-oro/60 transition hover:text-oro"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M3 3l18 18" strokeLinecap="round" />
              <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a17.5 17.5 0 0 1-2.9 3.7M6.6 6.6A16.8 16.8 0 0 0 2 12s3 7 10 7c1.4 0 2.7-.3 3.9-.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
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
