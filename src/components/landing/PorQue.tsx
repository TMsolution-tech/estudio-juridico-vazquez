import { Reveal } from '@/components/Reveal'
import { Counter } from '@/components/Counter'

const ITEMS = [
  {
    name: 'Experiencia',
    desc: 'Trayectoria consolidada en el fuero penal. Conocemos los procesos, los tiempos y las estrategias de defensa más efectivas.',
    icon: <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9.5 13 8 20l4-2.2L16 20l-1.5-7" />,
  },
  {
    name: 'Compromiso Personal',
    desc: 'Cada caso se trata con dedicación absoluta. Usted no es un expediente: es una persona con derechos que merecen ser defendidos.',
    icon: <path d="M11 17l-5.5 3 1-5.8L2 9.7l5.9-.9L11 3.5 14.1 8.8l5.9.9-4.5 4.5 1 5.8-5.5-3Z" />,
  },
  {
    name: 'Transparencia Total',
    desc: 'Comunicación clara y honesta en cada etapa. Le informamos el estado de su causa y las opciones disponibles sin tecnicismos.',
    icon: <path d="M8 3h8l4 5-8 13L4 8l4-5ZM4 8h16M12 21L9 8l3-5 3 5-3 13" />,
  },
]

export function PorQue() {
  return (
    <section id="nosotros" className="relative overflow-hidden border-t border-linea py-24 sm:py-32">
      <div className="animate-glow absolute -right-52 top-0 h-[420px] w-[420px] rounded-full bg-oxblood/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oro">
            <span className="h-0.5 w-7 bg-oro" />
            Nuestra diferencia
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-tinta sm:text-5xl">
            Por qué
            <br />
            elegirnos
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-tinta-soft">
            Defendemos personas, no expedientes. Cada causa recibe análisis
            estratégico, comunicación directa y un compromiso que se sostiene
            hasta la última instancia.
          </p>
          <div className="mt-10 flex gap-12 border-t border-linea pt-8">
            <div>
              <p className="font-display text-5xl font-black text-oro">Salta</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-tinta-soft">
                Fuero penal
              </p>
            </div>
            <div>
              <p className="font-display text-5xl font-black text-oro">
                <Counter to={100} suffix="%" />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-tinta-soft">
                Dedicación penal
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <div className="group flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-oro/25 bg-oro/8 transition group-hover:border-oro/60 group-hover:bg-oro/15">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-oro"
                  >
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display mb-2 text-lg font-bold text-tinta">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-tinta-soft">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
