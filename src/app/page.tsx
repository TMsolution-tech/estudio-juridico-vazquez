import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Services } from '@/components/landing/Services'
import { PorQue } from '@/components/landing/PorQue'
import { Novedades } from '@/components/landing/Novedades'
import { Contacto } from '@/components/landing/Contacto'
import { Footer } from '@/components/landing/Footer'
import { WhatsAppFloat } from '@/components/landing/WhatsAppFloat'
import { CONTACTOS, MAPS_LINK_URL, SITE } from '@/lib/site'
import { SITE_URL } from '@/lib/seo'
import type { Novedad } from '@/lib/types'

export const dynamic = 'force-dynamic'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: SITE.nombre,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-vazquez.webp`,
  image: `${SITE_URL}/logo-vazquez.webp`,
  description:
    'Estudio jurídico especializado en defensa penal en Salta, Argentina.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zuviría 265',
    addressLocality: 'Salta',
    addressRegion: 'Salta',
    addressCountry: 'AR',
  },
  telephone: CONTACTOS.map((contacto) => contacto.telefonoIntl),
  email: CONTACTOS.map((contacto) => contacto.email),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '18:00',
      closes: '20:30',
    },
  ],
  areaServed: {
    '@type': 'City',
    name: 'Salta',
  },
  hasMap: MAPS_LINK_URL,
  sameAs: [SITE.instagram],
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c'),
        }}
      />
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
