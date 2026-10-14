const SERVICES = [
  {
    title: 'Delitos Complejos',
    desc: 'Representación legal especializada en delitos de alta complejidad. Estrategia sólida y defensa comprometida en cada etapa del proceso.',
    featured: true,
    icon: (
      <>
        <path d="M3 21h18M5 21V9m14 12V9" />
        <path d="M3 9l9-6 9 6H3Z" />
        <path d="M8 13v4m4-4v4m4-4v4" />
      </>
    ),
  },
  {
    title: 'Defensa en Juicio',
    desc: 'Experiencia comprobada en litigios penales. Defendemos sus derechos con firmeza en cada instancia del proceso judicial.',
    featured: false,
    icon: (
      <>
        <path d="M12 3v18M8 21h8" />
        <path d="M4 7h16" />
        <path d="M6 7l-3 7h6l-3-7M18 7l-3 7h6l-3-7" />
        <path d="M3 14a3 3 0 0 0 6 0M15 14a3 3 0 0 0 6 0" />
      </>
    ),
  },
  {
    title: 'Asesoría Legal Preventiva',
    desc: 'Consultoría estratégica para prevenir riesgos legales. Proteja sus intereses antes de que surjan inconvenientes.',
    featured: false,
    icon: (
      <path d="M12 3l8 3v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3ZM9 12l2 2 4-4" />
    ),
  },
]

export function Services() {
  return (
    <div id="servicios" className="relative z-10 mx-auto -mt-32 max-w-6xl px-4 sm:px-6">
      <div className="grid shadow-2xl shadow-black/20 md:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className={`border p-8 transition-shadow hover:shadow-xl sm:p-10 ${
              s.featured
                ? 'border-oxblood bg-oxblood'
                : 'border-linea bg-papel'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mb-6 h-9 w-9 ${s.featured ? 'text-oro' : 'text-oxblood'}`}
            >
              {s.icon}
            </svg>
            <h3
              className={`font-display mb-3 text-xl font-bold ${
                s.featured ? 'text-crema' : 'text-tinta'
              }`}
            >
              {s.title}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                s.featured ? 'text-crema/80' : 'text-tinta-soft'
              }`}
            >
              {s.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
