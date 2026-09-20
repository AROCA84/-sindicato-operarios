"use client";

import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/hero/hero-1.png",
    tag: "Formación certificada",
    title: "Fórmate en maquinaria industrial con garantía sindical",
    text: "Cursos prácticos de carretillas, grúas y plataformas impartidos por profesionales del sector.",
  },
  {
    image: "/hero/hero-2.png",
    tag: "Movimiento de tierras",
    title: "Domina la maquinaria pesada de obra",
    text: "Retropala, dúmper y telescópica con formación real en obra y certificado oficial.",
  },
  {
    image: "/hero/hero-3.png",
    tag: "Logística y almacén",
    title: "Especialízate en logística y prevención de riesgos",
    text: "Transpaletas, apiladores y gestión de almacén con los máximos estándares de seguridad.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );
  const go = (i: number) => setCurrent(i);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy">
      <div className="relative h-[560px] w-full sm:h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== current}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="max-w-2xl">
              {slides.map((slide, i) => (
                <div
                  key={slide.title}
                  className={`transition-all duration-700 ${
                    i === current
                      ? "block translate-y-0 opacity-100"
                      : "hidden translate-y-4 opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-safety/40 bg-safety/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-safety">
                    {slide.tag}
                  </span>
                  <h1 className="mt-5 text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-pretty text-base text-white/75 sm:text-lg">
                    {slide.text}
                  </p>
                </div>
              ))}

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#cursos"
                  className="rounded-md bg-safety px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-safety-dark"
                >
                  Ver cursos
                </a>
                <a
                  href="#contacto"
                  className="rounded-md border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  Solicitar información
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-8 bg-safety" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
