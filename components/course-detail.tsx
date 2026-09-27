"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, BookOpen, ClipboardCheck } from "lucide-react";
import type { Course } from "@/lib/courses";

interface CourseDetailProps {
  course: Course;
}

export function CourseDetail({ course }: CourseDetailProps) {
  return (
    <main className="min-h-screen bg-navy text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-navy/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-safety"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a cursos
          </Link>

          <div className="text-right">
            <p className="text-sm font-black uppercase tracking-wider text-safety">
              Sindicato de Operarios
            </p>
            <p className="text-xs text-white/50">
              Formación gratuita
            </p>
          </div>
        </div>
      </header>

      {/* Course header */}
      <section className="border-b border-white/10 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-safety/30 bg-safety/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-safety">
              <BookOpen className="h-4 w-4" />
              Curso gratuito
            </div>

            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
              {course.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#examen"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-6 py-3 font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
              >
                Ir directamente al Test Gratis
                <ClipboardCheck className="h-5 w-5" />
              </a>

              <span className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 font-bold text-white/80">
                Estudiar: GRATIS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Free training message */}
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-safety/30 bg-safety/10 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-safety" />

              <div>
                <h2 className="text-lg font-black uppercase text-safety">
                  Formación y test gratuitos
                </h2>

                <p className="mt-2 text-base leading-relaxed text-white/80">
                  ESTUDIAR Y HACER EL TEST ES GRATIS. SOLO PAGAS AL FINAL SI
                  QUIERES OBTENER TU CERTIFICADO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temario */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Temario
          </h2>

          <p className="mt-3 text-white/60">
            Estudia todo el contenido del curso antes de realizar el test final.
          </p>

          <div className="mt-8 space-y-6">
            {course.modules.map((module, moduleIndex) => (
              <article
                key={module.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
              >
                <div className="border-b border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-safety font-black text-navy">
                      {moduleIndex + 1}
                    </div>

                    <div>
                      <h3 className="text-lg font-black uppercase">
                        {module.title}
                      </h3>

                      {module.description && (
                        <p className="mt-1 text-sm text-white/60">
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-start gap-4 p-5"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safety" />

                      <div>
                        <p className="font-bold text-white">
                          {lessonIndex + 1}. {lesson.title}
                        </p>

                        {lesson.content && (
                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/60">
                            {lesson.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final exam CTA */}
      <section
        id="examen"
        className="border-t border-white/10 bg-navy-dark px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-safety/10">
            <ClipboardCheck className="h-8 w-8 text-safety" />
          </div>

          <h2 className="mt-6 text-3xl font-black uppercase tracking-tight">
            ¿Has terminado de estudiar?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            Realiza ahora el test final completamente gratis. No tienes que
            pagar para estudiar ni para hacer el examen.
          </p>

          <a
            href={`/cursos/${course.id}/test`}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
          >
            Realizar Test Final Gratis
            <ClipboardCheck className="h-5 w-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
