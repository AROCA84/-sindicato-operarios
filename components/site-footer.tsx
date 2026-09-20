import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <>
      {/* Contact CTA */}
      <section id="contacto" className="bg-navy-light py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-light ring-1 ring-white/10">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="p-8 sm:p-10">
                <h2 className="text-balance text-3xl font-black text-white">
                  ¿Listo para dar el siguiente paso?
                </h2>
                <p className="mt-4 text-pretty text-white/70">
                  Solicita información sin compromiso. Te asesoramos sobre el
                  curso que mejor se adapta a tu perfil y objetivos.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <span className="text-safety">
                      <CheckIcon />
                    </span>
                    Plazas limitadas por convocatoria
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-safety">
                      <CheckIcon />
                    </span>
                    Financiación y bonificación disponible
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-safety">
                      <CheckIcon />
                    </span>
                    Certificado al finalizar
                  </li>
                </ul>
              </div>

              <form
                className="space-y-4 bg-white/5 p-8 sm:p-10"
                aria-label="Formulario de solicitud de información"
              >
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white/80">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-lg border border-white/15 bg-navy/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-safety focus:ring-2 focus:ring-safety/30"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white/80">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-lg border border-white/15 bg-navy/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-safety focus:ring-2 focus:ring-safety/30"
                    placeholder="600 000 000"
                  />
                </div>
                <div>
                  <label htmlFor="course" className="mb-1.5 block text-sm font-semibold text-white/80">
                    Curso de interés
                  </label>
                  <input
                    id="course"
                    type="text"
                    className="w-full rounded-lg border border-white/15 bg-navy/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-safety focus:ring-2 focus:ring-safety/30"
                    placeholder="Ej. Carretillero"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-safety px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-safety-dark"
                >
                  Solicitar información
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-white/60">
                Centro de formación del Sindicato de Operarios. Especialistas en
                maquinaria industrial, movimiento de tierras, logística y
                prevención de riesgos laborales.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-safety">
                Enlaces
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li><a href="#inicio" className="transition-colors hover:text-safety">Inicio</a></li>
                <li><a href="#cursos" className="transition-colors hover:text-safety">Cursos</a></li>
                <li><a href="#nosotros" className="transition-colors hover:text-safety">Nosotros</a></li>
                <li><a href="#contacto" className="transition-colors hover:text-safety">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-safety">
                Contacto
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>
                  <a
                    href="https://wa.me/34642077425"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-safety"
                  >
                    WhatsApp: +34 642 077 425
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contacto@sindicatodeoperarios.es"
                    className="transition-colors hover:text-safety"
                  >
                    contacto@sindicatodeoperarios.es
                  </a>
                </li>
                <li>Lunes a Viernes, 9:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Sindicato de Operarios · Formación Profesional. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
