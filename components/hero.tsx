"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/hero/hero-1.png",
    tag: "Formación gratuita",
    title: "Aprende. Haz el test. Consigue tu certificado.",
    text: "Afíliate gratis al Sindicato de Operarios, estudia desde el móvil y realiza tus tests gratuitos.",
  },
  {
    image: "/hero/hero-2.png",
    tag: "Maquinaria",
    title: "Formación para operarios que quieren avanzar.",
    text: "Carretillas, PEMP, puente grúa, maquinaria de obra, logística y prevención en una sola plataforma.",
  },
  {
    image: "/hero/hero-3.png",
    tag: "Tu progreso, contigo",
    title: "Continúa donde lo dejaste.",
    text: "Desde Mi Área puedes consultar tu número de afiliado, QR, cursos y progreso formativo.",
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
          <div key={slide.image} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== current}>
            <img src={slide.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-5 pb-5 sm:px-6">
            <div className="max-w-3xl">
              <div className="min-h-[270px]">
                {slides.map((slide, i) => i === current ? (
                  <div key={slide.title}>
                    <span className="inline-flex rounded-full border border-safety/40 bg-safety/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-safety">{slide.tag}</span>
                    <h1 className="mt-5 text-balance text-3xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">{slide.title}</h1>
                    <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/80 sm:text-lg sm:leading-7">{slide.text}</p>
                  </div>
                ) : null)}
              </div>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/afiliarse" className="rounded-xl bg-safety px-6 py-3.5 text-center text-sm font-black uppercase tracking-wide text-navy shadow-lg hover:bg-safety-dark">Afiliarme gratis</Link>
                <Link href="/cursos" className="rounded-xl border border-white/30 px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white hover:bg-white/10">Ver formación</Link>
              </div>
              <div className="mt-5 grid max-w-2xl grid-cols-2 gap-2 text-xs font-bold text-white/85 sm:grid-cols-4">
                <span>✓ Afiliación gratis</span><span>✓ Formación gratis</span><span>✓ Test gratis</span><span>✓ Certificado tras aprobar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          {slides.map((slide, i) => <button key={slide.image} type="button" onClick={() => setCurrent(i)} aria-label={`Ir a la diapositiva ${i + 1}`} aria-current={i === current} className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-safety" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />)}
        </div>
      </div>
    </section>
  );
}
