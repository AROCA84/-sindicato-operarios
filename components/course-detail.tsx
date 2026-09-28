"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, BookOpen, ClipboardCheck, UserPlus } from "lucide-react";
import type { Course, Module } from "@/lib/courses";
import { TemarioDownload } from "@/components/temario-download";

interface CourseDetailProps {
  course: Course;
  modules: Module[];
}

export function CourseDetail({ course, modules }: CourseDetailProps) {
  const [affiliated, setAffiliated] = useState(false);

  useEffect(() => {
    setAffiliated(window.localStorage.getItem("sdo-afiliado") === "true");
  }, []);

  return (
    <main className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10 bg-navy/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-safety">
            <ArrowLeft className="h-4 w-4" />
            Volver a cursos
          </Link>
          <div className="text-right">
            <p className="text-sm font-black uppercase tracking-wider text-safety">Sindicato de Operarios</p>
            <p className="text-xs text-white/50">Formación gratuita</p>
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-safety/30 bg-safety/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-safety">
              <BookOpen className="h-4 w-4" />
              Curso gratuito
            </div>
            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">{course.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">{course.description}</p>
          </div>
        </div>
      </section>

      <section id="temario" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Temario</h2>
          <p className="mt-3 text-white/60">
            Consulta aquí todo el contenido antes de realizar el test final. También puedes descargar el temario para estudiarlo cuando quieras.
          </p>
          <div className="mt-5"><TemarioDownload course={course} modules={modules} /></div>
          <div className="mt-8 space-y-6">
            {modules.map((module, moduleIndex) => (
              <article key={module.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <div className="border-b border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-safety font-black text-navy">{moduleIndex + 1}</div>
                    <div><h3 className="text-lg font-black uppercase">{module.title}</h3></div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-white">{module.lesson.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{module.lesson.intro}</p>
                  <div className="mt-5 space-y-3">
                    {module.lesson.points.map((point, pointIndex) => (
                      <div key={`${module.id}-point-${pointIndex}`} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safety" />
                        <p className="text-sm leading-relaxed text-white/70">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="examen" className="border-t border-white/10 bg-navy-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-safety/10">
            {affiliated ? <ClipboardCheck className="h-8 w-8 text-safety" /> : <UserPlus className="h-8 w-8 text-safety" />}
          </div>
          <h2 className="mt-6 text-3xl font-black uppercase tracking-tight">
            {affiliated ? "Formación desbloqueada" : "Afíliate gratis para comenzar"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            {affiliated
              ? "Ya estás afiliado. Puedes estudiar el temario y realizar el test final gratis cuando estés preparado."
              : "Completa tus datos una sola vez. La afiliación es gratuita y, al terminar, podrás continuar con este curso sin salir de aquí."}
          </p>

          {!affiliated && (
            <Link
              href={`/afiliarse?returnTo=${encodeURIComponent(`/cursos/${course.id}`)}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
            >
              Afíliate gratis para comenzar
              <UserPlus className="h-5 w-5" />
            </Link>
          )}

          {affiliated && (
            <a
              href={`/cursos/${course.id}/test`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
            >
              Realizar Test Final Gratis
              <ClipboardCheck className="h-5 w-5" />
            </a>
          )}
        </div>
      </section>
    </main>
  );
}