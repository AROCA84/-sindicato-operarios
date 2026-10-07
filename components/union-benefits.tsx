const resourceCards = [
  { icon: "🦺", title: "Equipamiento profesional", text: "EPIs, herramientas y material seleccionado para cada especialidad.", href: "#recursos" },
  { icon: "🚜", title: "Maquinaria y servicios", text: "Recursos, proveedores y servicios útiles para el trabajo industrial.", href: "#recursos" },
  { icon: "💻", title: "Tecnología e IA", text: "Herramientas digitales para mejorar tu trabajo y productividad.", href: "#recursos" },
  { icon: "💼", title: "Empleo y oportunidades", text: "Recursos profesionales, empresas y oportunidades para operarios.", href: "#recursos" },
];

const steps = [
  {
    number: "01",
    title: "Afíliate gratis",
    text: "Afíliate gratis y accede a la plataforma profesional.",
  },
  {
    number: "02",
    title: "Formación gratis",
    text: "Accede a formación gratuita y temarios para mejorar tu preparación profesional.",
  },
  {
    number: "03",
    title: "Test gratis",
    text: "Realiza el test gratis después de tu formación.",
  },
  {
    number: "04",
    title: "Certificado de aptitud",
    text: "Si apruebas, podrás continuar con el proceso para obtener tu certificado.",
  },
];

export function UnionBenefits() {
  return (
    <section id="afiliate" className="relative overflow-hidden bg-navy py-14 text-white sm:py-16">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 0 48%, rgba(255,196,0,.25) 48% 49%, transparent 49%), repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 12px)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">
            Cómo funciona
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Una plataforma profesional para operarios
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Formación, herramientas y recursos profesionales en un mismo lugar. Diseñada para móvil y pensada para el trabajo real.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-safety/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-safety text-xs font-black text-navy">
                  {step.number}
                </div>
                <h3 className="text-base font-black leading-tight">{step.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-300">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-4xl rounded-xl border border-safety/30 bg-safety/10 px-4 py-3 text-center">
          <p className="text-sm font-black text-white sm:text-base">
            AFÍLIATE GRATIS · FORMACIÓN Y TEST GRATUITOS · CERTIFICADO OPCIONAL TRAS APROBAR
          </p>
        </div>

        <div id="recursos" className="mt-12 scroll-mt-24">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">Recursos profesionales</p>
              <h3 className="mt-2 text-2xl font-black sm:text-3xl">Todo lo que necesitas después de formarte</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/60">Estamos preparando una nueva zona de recursos con equipamiento, herramientas, tecnología, servicios y oportunidades para operarios.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCards.map((item) => (
              <a key={item.title} href={item.href} className="group rounded-2xl border border-white/10 bg-white/[0.055] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-safety/50 hover:bg-white/[0.09] hover:shadow-[0_18px_50px_rgba(0,0,0,.28)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safety/10 text-xl ring-1 ring-safety/20">{item.icon}</div>
                <h4 className="mt-4 text-base font-black">{item.title}</h4>
                <p className="mt-2 text-xs leading-5 text-white/60">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-safety">Próximamente <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <a
            href="/afiliarse?returnTo=/"
            className="rounded-xl bg-safety px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-navy shadow-lg hover:bg-safety-dark"
          >
            Afíliate gratis
          </a>
        </div>
      </div>
    </section>
  );
}
