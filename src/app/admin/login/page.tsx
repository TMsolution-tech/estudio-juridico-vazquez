import Link from 'next/link'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-noche px-4">
      <div className="w-full max-w-sm border border-linea-noche bg-noche-2 p-8 shadow-2xl shadow-black/50">
        <p className="font-display text-center text-xl font-bold uppercase tracking-wide text-crema">
          Vázquez <span className="text-oro">Estudio Penal</span>
        </p>
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-crema-soft">
          Acceso administración
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
        <Link
          href="/"
          className="mt-4 block text-center text-xs text-crema-soft hover:text-oro"
        >
          ← Volver al sitio
        </Link>
      </div>
    </main>
  )
}
