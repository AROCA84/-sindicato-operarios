const features = [
  {
    title: "Formación accesible",
    text: "Estudia los contenidos y realiza los tests gratis desde el móvil, sin pagar por adelantado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" stroke="currentColor" strokeWidth="2"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/><path d="M8 7h8M8 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: "Tests gratuitos",
    text: "Comprueba tus conocimientos antes de decidir si quieres obtener el certificado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Certificado después de aprobar",
    text: "El pago de 4,99 € se solicita únicamente al final, si has aprobado y quieres obtener tu certificado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h10v18l-5-3-5 3V3Z" stroke="currentColor" strokeWidth="2"/><path d="m9 9 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Comunidad de operarios",
    text: "Un espacio centrado en formación, seguridad, derechos laborales y vida profesional del sector.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="2"/><path d="M3.5 19c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M14 15c2.7-.5 5.2.8 6 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
];

export function Features() {
  return (
    <section id="nosotros" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:-translate-y-1 hover:border-safety hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-safety">{f.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
