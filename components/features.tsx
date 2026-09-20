const features = [
  {
    title: "Certificados oficiales",
    text: "Formación homologada según normativa vigente y UNE, válida en toda España.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Formadores profesionales",
    text: "Instructores con experiencia real en obra, almacén e industria.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Prácticas reales",
    text: "Maquinaria real para que aprendas manejando, no solo en teoría.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 4h-4v6H4v6a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="20" r="2" stroke="currentColor" strokeWidth="2" />
        <path d="M14 4l4 6h3v8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Bolsa de empleo",
    text: "Conectamos a nuestros alumnos con empresas del sector industrial.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="nosotros" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-colors hover:border-safety"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-safety">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
