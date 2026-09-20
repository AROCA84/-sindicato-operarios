"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course, Module } from "@/lib/courses";

export function CourseDetail({
  course,
  modules,
}: {
  course: Course;
  modules: Module[];
}) {
  const [active, setActive] = useState(0);
  const lastIndex = modules.length - 1;
  const completed = active === lastIndex;

  return (
    <main className="bg-slate-50">
      {/* Course header */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
          <Link
            href="/#cursos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-safety"
          >
            <BackIcon />
            Volver al catálogo
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block rounded-md bg-safety px-3 py-1 text-xs font-black uppercase tracking-wide text-navy">
                Formación Gratis · 0 €
              </span>
              <h1 className="mt-4 text-balance text-3xl font-black leading-tight sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 text-pretty text-slate-300">
                {course.description}
              </p>
            </div>

            <a
              href="#examen"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-safety px-6 py-3.5 text-sm font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
            >
              Ir directamente al Test Gratis
              <ArrowIcon />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Modules menu */}
          <nav aria-label="Temario del curso" className="lg:sticky lg:top-6 lg:self-start">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-safety-dark">
              Temario
            </h2>
            <ol className="space-y-2">
              {modules.map((m, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-navy text-white shadow-sm"
                          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isActive
                            ? "bg-safety text-navy"
                            : isDone
                              ? "bg-safety/20 text-safety-dark"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isDone ? <CheckIcon /> : i + 1}
                      </span>
                      <span className="leading-snug">{m.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Content area */}
          <div>
            <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <span className="text-sm font-bold uppercase tracking-widest text-safety-dark">
                {modules[active].title}
              </span>
              <h2 className="mt-2 text-balance text-2xl font-black text-navy">
                {modules[active].lesson.title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-slate-600">
                {modules[active].lesson.intro}
              </p>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-navy">
                Puntos clave
              </h3>
              <ul className="mt-4 space-y-3">
                {modules[active].lesson.points.map((point) => (
                  <li key={point} className="flex gap-3 text-slate-700">
                    <span className="mt-1 shrink-0 text-safety-dark">
                      <BulletIcon />
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => setActive((i) => Math.max(0, i - 1))}
                  disabled={active === 0}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <BackIcon />
                  Tema anterior
                </button>

                {!completed ? (
                  <button
                    type="button"
                    onClick={() => setActive((i) => Math.min(lastIndex, i + 1))}
                    className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-light"
                  >
                    Siguiente Tema
                    <ArrowIcon />
                  </button>
                ) : (
                  <span className="text-sm font-bold text-safety-dark">
                    Temario completado
                  </span>
                )}
              </div>
            </article>

            {/* Final exam CTA */}
            <div
              id="examen"
              className="mt-8 scroll-mt-6 overflow-hidden rounded-xl bg-navy p-8 text-center shadow-lg ring-1 ring-navy sm:p-10"
            >
              <span className="inline-block rounded-md bg-safety px-3 py-1 text-xs font-black uppercase tracking-wide text-navy">
                Examen final
              </span>
              <h2 className="mt-4 text-balance text-2xl font-black text-white sm:text-3xl">
                ¿Listo para conseguir tu certificado?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-slate-300">
                Completa el temario y pon a prueba tus conocimientos. El examen
                es totalmente gratuito y sin compromiso.
              </p>
              <a
                href="/#contacto"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
              >
                Realizar Examen Final Gratis
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BulletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
