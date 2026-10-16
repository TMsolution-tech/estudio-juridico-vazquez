// Datos de contacto del estudio — un solo lugar para cambiarlos.
export const SITE = {
  nombre: 'Vazquez Estudio Penal',
  direccion: 'Zuviría 265, Salta, Argentina',
  horario: 'Lunes a Viernes · 9:00 – 13:00 hs · 18:00 – 20:30 hs',
  instagram: 'https://www.instagram.com/vazquezestudiopenal',
  whatsappMsg:
    'Hola, me comunico desde el sitio web y quisiera obtener información sobre sus servicios legales. Muchas gracias.',
}

export type Contacto = {
  nombre: string
  email: string
  telefono: string
  telefonoIntl: string
}

export const CONTACTOS: Contacto[] = [
  {
    nombre: 'Ariel Vazquez',
    email: 'arielernestovazquez@gmail.com',
    telefono: '(387) 403-3409',
    telefonoIntl: '+5493874033409',
  },
  {
    nombre: 'Mauricio Vazquez',
    email: 'vazquez.mauricio.derecho@gmail.com',
    telefono: '(387) 227-8689',
    telefonoIntl: '+5493872278689',
  },
]

export function whatsappUrl(c: Contacto) {
  return `https://wa.me/${c.telefonoIntl.replace('+', '')}?text=${encodeURIComponent(
    SITE.whatsappMsg,
  )}`
}

// WhatsApp principal (flotante / hero): Ariel
export const WHATSAPP_URL = whatsappUrl(CONTACTOS[0])

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.direccion,
)}&z=16&output=embed`

export const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.direccion,
)}`
