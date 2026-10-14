// Datos de contacto del estudio — un solo lugar para cambiarlos.
export const SITE = {
  nombre: 'Vázquez Estudio Penal',
  email: 'arielernestovazquez@gmail.com',
  telefono: '(387) 403-3409',
  telefonoIntl: '+5493874033409',
  direccion: 'Zuviría 265, Salta, Argentina',
  horario: 'Lunes a Viernes · 9:00 – 13:00 hs · 18:00 – 20:30 hs',
  whatsappMsg:
    'Hola, me comunico desde el sitio web y quisiera obtener información sobre sus servicios legales. Muchas gracias.',
}

export const WHATSAPP_URL = `https://wa.me/5493874033409?text=${encodeURIComponent(
  SITE.whatsappMsg,
)}`
