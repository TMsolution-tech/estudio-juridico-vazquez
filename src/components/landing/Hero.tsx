import { WHATSAPP_URL } from '@/lib/site'

const TICKER = [
  'Defensa penal',
  'Litigación oral',
  'Delitos complejos',
  'Salta, Argentina',
  'Asesoría preventiva',
]

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden bg-noche">
      {/* Fondo con zoom lento */}
      <div
        className="animate-ken-burns absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/80 to-noche/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-transparent to-noche/60" />
      {/* halo dorado */}
      <div className="animate-glow absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-oro/10 blur-[140px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-24 pt-36 sm:px-6">
        <div>
          <p
            className="animate-fade-up mb-7 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-oro"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="h-px w-12 bg-oro" />
            Estudio Penal Salta
          </p>
          <h1
            className="animate-fade-up font-display max-w-4xl text-6xl font-black leading-[0.98] text-crema sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.25s' }}
          >
            Defensa penal
            <br />
            <span className="text-crema/60">efectiva.</span> Su futuro,
            <br />
            <em className="bg-gradient-to-r from-oro to-oro-soft bg-clip-text font-medium italic text-transparent">
              nuestra prioridad.
            </em>
          </h1>
          <p
            className="animate-fade-up mt-8 max-w-xl text-sm leading-relaxed text-crema-soft sm:text-base"
            style={{ animationDelay: '0.45s' }}
          >
            Representación legal especializada en el fuero penal. Estrategia,
            experiencia y compromiso personal en cada etapa del proceso.
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: '0.6s' }}
          >
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
              className="border border-oro/40 px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-oro transition hover:border-oro hover:bg-oro/10"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-linea bg-noche/80 py-4 backdrop-blur-sm">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {TICKER.map((t) => (
                <span
                  key={`${copy}-${t}`}
                  className="font-display mx-8 flex items-center gap-8 whitespace-nowrap text-lg font-medium uppercase tracking-[0.2em] text-crema/50"
                >
                  {t}
                  <span className="text-oro">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
