"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cacheResult, clearCachedResult, fetchApprovedResult, getStoredAffiliate, readCachedResult } from "@/lib/affiliate-client";
import { ArrowLeft, CheckCircle2, BookOpen, ClipboardCheck, UserPlus } from "lucide-react";
import type { Course, Module } from "@/lib/courses";
import { TemarioDownload } from "@/components/temario-download";

interface CourseDetailProps { course: Course; modules: Module[]; }

export function CourseDetail({ course, modules }: CourseDetailProps) {
  const [affiliated, setAffiliated] = useState(false);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    setAffiliated(window.localStorage.getItem("sdo-afiliado") === "true");
    const affiliate = getStoredAffiliate();
    if (!affiliate) return;
    setApproved(Boolean(readCachedResult(course.id)));
    const controller = new AbortController();
    fetchApprovedResult(course.id, affiliate, controller.signal).then((result) => {
      if (result === "error") return;
      if (result) cacheResult(course.id, result);
      else clearCachedResult(course.id);
      setApproved(Boolean(result));
    });
    return () => controller.abort();
  }, [course.id]);
  const testLabel = approved ? "Test aprobado · Ver resultado y certificado" : "Realizar Test Final Gratis";

  return (
    <main className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10 bg-navy/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-safety"><ArrowLeft className="h-4 w-4" />Volver a cursos</Link>
          <div className="text-right"><p className="text-sm font-black uppercase tracking-wider text-safety">Sindicato de Operarios</p><p className="text-xs text-white/50">Formación gratuita</p></div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-safety/30 bg-safety/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-safety"><BookOpen className="h-4 w-4" />Curso gratuito</div>
          <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">{course.description}</p>
          {affiliated && (
            <a href={`/cursos/${course.id}/test`} className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-7 py-4 text-sm font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark">
              {testLabel} <ClipboardCheck className="h-5 w-5" />
            </a>
          )}
        </div></div>
      </section>

      <section id="temario" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Temario</h2>
          <p className="mt-3 text-white/60">Consulta aquí todo el contenido antes de realizar el test final. También puedes descargar el temario para estudiarlo cuando quieras.</p>
          <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
            <p className="text-sm font-black uppercase tracking-wider text-amber-300">Información importante</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Esta formación online proporciona conocimientos teóricos y preventivos. En determinados equipos y puestos puede ser necesaria formación práctica, autorización de la empresa, instrucciones del fabricante u otros requisitos aplicables. Aprobar el test online no sustituye por sí solo esos requisitos.
            </p>
          </div>
          <div className="mt-5">
            {affiliated ? <TemarioDownload course={course} modules={modules} /> : (
              <Link href={`/afiliarse?returnTo=${encodeURIComponent(`/cursos/${course.id}`)}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-6 py-3 text-sm font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark">
                Afíliate gratis y accede a la formación gratuita <UserPlus className="h-5 w-5" />
              </Link>
            )}
          </div>

          <div className="mt-8">
            <div className="mb-5 rounded-xl border border-safety/20 bg-safety/5 p-5">
              <p className="text-sm font-black uppercase tracking-wider text-safety">Aula online</p>
              <h3 className="mt-1 text-xl font-black">Estudia el curso directamente en la web</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">No necesitas descargar nada para estudiar. Una vez afiliado, podrás leer cada tema aquí mismo, consultar las imágenes de referencia y avanzar hasta el test final.</p>
            </div>
            <div className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <article key={module.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                  <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
                    <div className="relative min-h-[160px] overflow-hidden bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={course.image || "/placeholder.svg"} alt={`Imagen de referencia: ${module.title}`} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                      <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-safety font-black text-navy">{moduleIndex + 1}</span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="text-xs font-black uppercase tracking-wider text-safety">Tema {moduleIndex + 1}</p>
                      <h3 className="mt-1 text-xl font-black uppercase">{module.title}</h3>
                      <h4 className="mt-4 font-bold text-white">{module.lesson.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{module.lesson.intro}</p>
                      <div className="mt-6 space-y-7">
                        {module.lesson.sections?.map((section, sectionIndex) => (
                          <section key={`${module.id}-section-${sectionIndex}`} className="border-t border-white/10 pt-5">
                            <h5 className="text-base font-black text-white">{section.heading}</h5>
                            <p className="mt-3 text-sm leading-7 text-white/75">{section.text}</p>
                            {section.bullets?.length ? (
                              <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-safety">
                                {section.bullets.map((bullet, bulletIndex) => (
                                  <li key={`${module.id}-section-${sectionIndex}-bullet-${bulletIndex}`} className="text-sm leading-6 text-white/65">{bullet}</li>
                                ))}
                              </ul>
                            ) : null}
                          </section>
                        ))}
                        {!module.lesson.sections?.length && module.lesson.points.map((point, pointIndex) => (
                          <div key={`${module.id}-point-${pointIndex}`} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safety" />
                            <p className="text-sm leading-relaxed text-white/70">{point}</p>
                      </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="examen" className="border-t border-white/10 bg-navy-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-safety/10">
            {affiliated ? <ClipboardCheck className="h-8 w-8 text-safety" /> : <UserPlus className="h-8 w-8 text-safety" />}
          </div>
          <h2 className="mt-6 text-3xl font-black uppercase tracking-tight">{affiliated ? "Formación desbloqueada" : "Afíliate gratis para comenzar"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            {affiliated ? "Ya estás afiliado. Puedes estudiar el temario y realizar el test final gratis cuando estés preparado." : "Completa tus datos una sola vez. La afiliación es gratuita y, al terminar, tendrás acceso a la formación gratuita, al temario y al test de este curso."}
          </p>
          {!affiliated && (
            <Link href={`/afiliarse?returnTo=${encodeURIComponent(`/cursos/${course.id}`)}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark">
              Afíliate gratis y accede a la formación gratuita <UserPlus className="h-5 w-5" />
            </Link>
          )}
          {affiliated && (
            <a href={`/cursos/${course.id}/test`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark">
              {testLabel} <ClipboardCheck className="h-5 w-5" />
            </a>
          )}
        </div>
      </section>
    </main>
  );
}