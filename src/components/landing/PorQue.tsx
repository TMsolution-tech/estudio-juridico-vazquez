const ITEMS = [
  {
    name: 'Experiencia',
    desc: 'Más de 15 años de trayectoria en el fuero penal. Conocemos los procesos, los tiempos y las estrategias de defensa más efectivas.',
    icon: <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9.5 13 8 20l4-2.2L16 20l-1.5-7" />,
  },
  {
    name: 'Resultados',
    desc: 'Historial comprobable de casos exitosos. Nuestros clientes obtienen resultados reales gracias a una defensa sólida y planificada.',
    icon: <path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a2 2 0 0 0 2 4h1m10-4h3a2 2 0 0 1-2 4h-1" />,
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
    <section id="nosotros" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-oxblood">
            <span className="h-0.5 w-7 bg-oxblood" />
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
          <div className="mt-10 flex gap-10 border-t border-linea pt-8">
            <div>
              <p className="font-display text-4xl font-black text-oxblood">15+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-tinta-soft">
                Años de trayectoria
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-oxblood">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-tinta-soft">
                Dedicación penal
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item.name} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-oxblood/8 ring-1 ring-oxblood/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-oxblood"
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
          ))}
        </div>
      </div>
    </section>
  )
}
