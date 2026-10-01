"use client";

import Link from "next/link";
import { useMemo } from "react";
import { allCourses } from "@/lib/academy-catalog";
import { getExam, PASS_MARK } from "@/lib/exam";

export default function TestPruebaPage() {
  const course = allCourses[0];
  const questions = useMemo(() => getExam(course), [course]);
  const score = Math.max(PASS_MARK, Math.min(questions.length, PASS_MARK + 2));
  const answers = questions.map((q, i) => (i < score ? q.answer : (q.answer + 1) % q.options.length));
  const attemptId = "PRUEBA-INTERNA";
  const certificateUrl = `/certificado/${course.id}?score=${score}&total=${questions.length}&intento=${encodeURIComponent(attemptId)}`;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950">
            Prueba interna
          </span>
          <h1 className="mt-4 text-3xl font-black">Simulación completa del resultado</h1>
          <p className="mt-3 text-slate-300">
            Simula un aprobado sin responder las preguntas y comprueba el paso hasta el certificado y el pago.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Curso</p>
              <p className="mt-1 font-black">{course.title}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Resultado</p>
              <p className="mt-1 text-2xl font-black text-emerald-600">{score}/{questions.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Estado</p>
              <p className="mt-1 font-black text-emerald-600">APROBADO</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Modo interno:</strong> no realiza el examen ni crea un intento real. No se realiza ningún cobro.
          </div>

          <div className="mt-6 rounded-2xl border-2 border-slate-200 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Paso 1</p>
            <h2 className="mt-1 text-xl font-black">Resultado del test</h2>
            <p className="mt-2 text-sm text-slate-600">Simulación: <strong>{score}/{questions.length}</strong> · Aprobado.</p>
          </div>

          <div className="mt-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Paso 2</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Obtener diploma / certificado</h2>
            <p className="mt-2 text-sm text-slate-700">
              El certificado cuesta <strong>4,99 €</strong> y solo se solicita después de aprobar.
            </p>
            <Link
              href={certificateUrl}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-6 py-4 text-sm font-black uppercase text-slate-950 shadow-lg"
            >
              Obtener diploma / certificado · 4,99 € →
            </Link>
          </div>

          <details className="mt-6 rounded-xl border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm font-black">Ver respuestas simuladas</summary>
            <div className="mt-4 space-y-3">
              {questions.map((q, i) => {
                const correct = answers[i] === q.answer;
                return (
                  <div key={i} className="rounded-lg bg-slate-50 p-3 text-sm">
                    <span className="font-black">Pregunta {i + 1}:</span>{" "}
                    <span className={correct ? "text-emerald-700" : "text-red-700"}>
                      {correct ? "✓ Correcta" : "✕ Incorrecta"}
                    </span>
                  </div>
                );
              })}
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}
