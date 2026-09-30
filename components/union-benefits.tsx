const steps = [
  {
    number: "01",
    title: "Afíliate gratis",
    text: "Únete al Sindicato de Operarios gratis y de por vida.",
  },
  {
    number: "02",
    title: "Formación gratis",
    text: "Accede a cursos y temarios para mejorar tu preparación profesional.",
  },
  {
    number: "03",
    title: "Test gratis",
    text: "Estudia y realiza el test sin pagar nada.",
  },
  {
    number: "04",
    title: "Certificado de aptitud",
    text: "Si apruebas, podrás continuar con el proceso para obtener tu certificado APTO.",
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
            Únete y consigue tu formación
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Un proceso sencillo: afiliación gratuita, formación, test y certificado de aptitud.
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
            ESTUDIAR Y HACER EL TEST ES GRATIS. EL CERTIFICADO SE GESTIONA DESPUÉS DE APROBAR.
          </p>
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
