const features = [
  {
    title: "Formación accesible",
    text: "Estudia los contenidos desde el móvil y avanza a tu ritmo.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" stroke="currentColor" strokeWidth="2"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/><path d="M8 7h8M8 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: "Tests gratuitos",
    text: "Comprueba tus conocimientos y consulta tu resultado al terminar.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Certificado tras aprobar",
    text: "Cuando superes el test podrás continuar con el proceso para obtener tu certificado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h10v18l-5-3-5 3V3Z" stroke="currentColor" strokeWidth="2"/><path d="m9 9 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

export function Features() {
  return (
    <section id="nosotros" className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-safety-dark">Así de sencillo</p>
          <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">Tu formación, paso a paso</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-safety">{f.icon}</div>
              <div>
                <h3 className="text-base font-bold text-navy">{f.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
