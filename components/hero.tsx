"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/hero/proteccion-legal.jpg",
    tag: "Protección legal y personal",
    title: "Defensa y apoyo cuando más lo necesitas.",
    text: "Defensa jurídica ante despidos, sanciones o conflictos laborales. Representación y acompañamiento en reuniones laborales y respaldo de la caja de resistencia en situaciones específicas, como huelgas prolongadas.",
  },
  {
    image: "/hero/mejoras-laborales.jpg",
    tag: "Mejoras económicas y laborales",
    title: "Defendemos mejores condiciones laborales.",
    text: "Negociación colectiva, mejores condiciones salariales, regulación de horas extras y turnos especiales, mejores condiciones de vacaciones y negociación de medidas para el futuro laboral y la jubilación.",
  },
  {
    image: "/hero/ventajas-sindicato.jpg",
    tag: "Ventajas de pertenecer al Sindicato",
    title: "Más apoyo. Más oportunidades.",
    text: "Afiliación gratuita y de por vida, formación desde 0 €, acceso a beneficios y servicios para afiliados y apoyo y representación en el ámbito laboral.",
  },
  {
    image: "/hero/formacion-gratuita.jpg",
    tag: "Formación gratuita",
    title: "Estudia y haz tus tests gratis.",
    text: "Accede a cursos y temarios, estudia a tu ritmo y realiza los tests sin pagar. Solo pagas al final si, después de aprobar, quieres obtener tu certificado.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy">
      <div className="relative min-h-[430px] w-full sm:min-h-[520px]">
        {slides.map((slide, i) => (
          <div
            key={`${slide.tag}-${i}`}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== current}
          >
            <img src={slide.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-5 pb-5 sm:px-6">
            <div className="max-w-3xl">
              <div className="min-h-[250px]">
                {slides.map((slide, i) =>
                  i === current ? (
                    <div key={slide.title}>
                      <span className="inline-flex rounded-full border border-safety/40 bg-safety/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-safety">
                        {slide.tag}
                      </span>
                      <h1 className="mt-5 text-balance text-3xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/80 sm:text-lg sm:leading-7">
                        {slide.text}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/afiliarse"
                  className="group relative inline-flex min-h-[58px] items-center justify-between overflow-hidden rounded-md bg-safety px-6 py-3 text-left text-sm font-black uppercase tracking-[0.1em] text-navy shadow-[0_8px_0_rgba(0,0,0,0.22),0_18px_35px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_0_rgba(0,0,0,0.22),0_22px_40px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_3px_0_rgba(0,0,0,0.22)] focus:outline-none focus:ring-2 focus:ring-safety focus:ring-offset-2 focus:ring-offset-navy sm:w-[235px]"
                >
                  <span className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.2em] opacity-70">SINDICATO DE OPERARIOS</span>
                    <span className="mt-0.5 text-sm">Afiliarme gratis</span>
                  </span>
                  <span aria-hidden="true" className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-black text-safety transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

                <Link
                  href="/cursos"
                  className="group inline-flex min-h-[58px] items-center justify-between rounded-md border border-white/30 bg-white/[0.07] px-6 py-3 text-left text-sm font-black uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/[0.14] active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-navy sm:w-[235px]"
                >
                  <span className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/50">FORMACIÓN PROFESIONAL</span>
                    <span className="mt-0.5 text-sm">Ver formación</span>
                  </span>
                  <span aria-hidden="true" className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-lg font-black text-white transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          {slides.map((slide, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === current}
              className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-safety" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
