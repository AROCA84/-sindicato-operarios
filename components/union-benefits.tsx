const benefits = [
  { title: "Más información y orientación", text: "Entiende mejor tus derechos, tu convenio, la prevención y las condiciones de tu puesto antes de tomar decisiones laborales." },
  { title: "Participación y representación", text: "Las personas trabajadoras pueden participar y estar representadas en cuestiones que afectan a sus condiciones de trabajo y seguridad." },
  { title: "Seguridad en el trabajo", text: "La prevención y la salud laboral son una prioridad, especialmente en almacenes, logística, maquinaria e industria." },
  { title: "Formación continua", text: "Accede desde la plataforma a contenidos formativos y recursos para mejorar tus conocimientos profesionales." },
  { title: "Fuerza colectiva", text: "La negociación colectiva permite abordar condiciones de trabajo de forma organizada, junto con otras personas del sector." },
  { title: "Una comunidad del sector", text: "Conecta con otros operarios y construye una comunidad centrada en empleo, formación y seguridad laboral." },
];

export function UnionBenefits() {
  return (
    <section id="afiliate" className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 48%, rgba(255,196,0,.25) 48% 49%, transparent 49%), repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 12px)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-safety">No estás solo en el trabajo</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Únete al Sindicato de Operarios</h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">Afiliarte significa formar parte de una comunidad de trabajadores de logística, almacén, maquinaria e industria. La organización sindical también tiene un papel reconocido en la participación, la seguridad laboral y la negociación colectiva.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-safety/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-safety text-sm font-black text-navy">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-5 text-lg font-black">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-safety/30 bg-safety/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-black text-white">Afiliación gratuita</p><p className="mt-1 text-sm text-slate-300">Estudia y realiza los tests gratis. El certificado se paga solo si apruebas y decides obtenerlo.</p></div>
          <a href="#cursos" className="rounded-xl bg-safety px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-navy hover:bg-safety-dark">Ver formación</a>
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">La participación sindical, la representación y los derechos de información y consulta dependen del marco legal y de la situación concreta de cada centro de trabajo. La Ley 31/1995 reconoce la participación de las personas trabajadoras en cuestiones de seguridad y salud laboral, y el Estatuto de los Trabajadores regula derechos de formación y representación.</p>
      </div>
    </section>
  );
}
