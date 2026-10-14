import { WHATSAPP_URL } from '@/lib/site'
import { WhatsAppIcon } from './Contacto'

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
