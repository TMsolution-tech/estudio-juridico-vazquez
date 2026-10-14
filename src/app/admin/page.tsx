import { AdminDashboard } from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-marfil">
      <AdminDashboard />
    </main>
  )
}
