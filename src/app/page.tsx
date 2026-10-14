import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Services } from '@/components/landing/Services'
import { PorQue } from '@/components/landing/PorQue'
import { Novedades } from '@/components/landing/Novedades'
import { Contacto } from '@/components/landing/Contacto'
import { Footer } from '@/components/landing/Footer'
import { WhatsAppFloat } from '@/components/landing/WhatsAppFloat'
import type { Novedad } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getNovedades(): Promise<Novedad[]> {
  // Sin credenciales todavía → sección vacía, el sitio igual funciona.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('novedades')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(12)
    return (data ?? []) as Novedad[]
  } catch {
    return []
  }
}

export default async function Home() {
  const novedades = await getNovedades()

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <PorQue />
        <Novedades novedades={novedades} />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
