import { WHATSAPP_URL } from '@/lib/site'

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden bg-noche">
      {/* Fondo: tribunales + gradiente */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/85 to-noche/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-noche/80 via-transparent to-noche/40" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-40 pt-32 sm:px-6">
        <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-oro">
          <span className="h-px w-10 bg-oro" />
          Estudio jurídico penal — Salta, Argentina
        </p>
        <h1 className="font-display max-w-3xl text-5xl font-black leading-[1.02] text-crema sm:text-6xl lg:text-7xl">
          Defensa penal
          <br />
          efectiva. Su futuro,
          <br />
          <em className="font-medium italic text-oro-soft">nuestra prioridad.</em>
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-crema-soft sm:text-base">
          Representación legal especializada en el fuero penal. Estrategia,
          experiencia y compromiso personal en cada etapa del proceso.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="bg-oxblood px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-crema transition hover:bg-vino"
          >
            Agende su consulta inicial
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-crema/30 px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-crema transition hover:border-oro hover:text-oro"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
