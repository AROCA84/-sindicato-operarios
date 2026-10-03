"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/courses";
import { getExam, PASS_MARK, TOTAL_QUESTIONS, type ExamQuestion } from "@/lib/exam";
type Phase = "quiz" | "result";
export function CourseExam({ course, internalPreview = false }: { course: Course; internalPreview?: boolean }) {
  const questions = useMemo(() => getExam(course), [course]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    internalPreview
      ? questions.map((q, i) => (i < Math.max(PASS_MARK, Math.min(questions.length, PASS_MARK + 2)) ? q.answer : (q.answer + 1) % q.options.length))
      : Array(questions.length).fill(-1)
  );
  const [phase, setPhase] = useState<Phase>(internalPreview ? "result" : "quiz");
  const [affiliated, setAffiliated] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [attemptId, setAttemptId] = useState(internalPreview ? "PRUEBA-INTERNA" : "");
  const [submitError, setSubmitError] = useState("");
  const internalScore = Math.max(PASS_MARK, Math.min(questions.length, PASS_MARK + 2));
  const internalAnswers = useMemo(
    () => questions.map((q, i) => (i < internalScore ? q.answer : (q.answer + 1) % q.options.length)),
    [questions, internalScore]
  );

  useEffect(() => {
    if (!internalPreview) return;
    setAnswers(internalAnswers);
    setAttemptId("PRUEBA-INTERNA");
    setPhase("result");
  }, [internalPreview, internalAnswers]);

  const selected = answers[current];
  const isLast = current === questions.length - 1;
  const score = useMemo(() => answers.reduce((acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc), 0), [answers, questions]);
  const passed = score >= PASS_MARK;

  useEffect(() => {
    setAffiliated(window.localStorage.getItem("sdo-afiliado") === "true");

    if (!internalPreview && window.localStorage.getItem("sdo-progreso-" + course.id) === "100") {
      try {
        const saved = JSON.parse(window.localStorage.getItem("sdo-resultado-" + course.id) || "null");
        if (
          saved &&
          typeof saved.attemptId === "string" &&
          typeof saved.score === "number" &&
          typeof saved.total === "number" &&
          Array.isArray(saved.answers)
        ) {
          setAttemptId(saved.attemptId);
          setAnswers(saved.answers);
          setPhase("result");
        }
      } catch {
        // Si no hay resultado guardado, se mantiene el flujo normal del test.
      }
    }
  }, [course.id, internalPreview]);

  function select(optionIndex: number) {
    setAnswers((prev) => { const next = [...prev]; next[current] = optionIndex; return next; });
  }
  async function next() {
    if (isLast) {
      setSubmitting(true);
      setSubmitError("");
      try {
        const email = window.localStorage.getItem("sdo-afiliado-email") || "";
        const numero = window.localStorage.getItem("sdo-numero-afiliado") || "";
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        let response: Response;
        try {
          response = await fetch("/api/tests/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, numero_afiliado: numero, curso_id: course.id, respuestas: answers }),
            signal: controller.signal,
          });
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("La comprobación del resultado está tardando demasiado. Comprueba la conexión y vuelve a intentarlo.");
          }
          throw error;
        } finally {
          window.clearTimeout(timeout);
        }
        const raw = await response.text();
        let data: { error?: string; intento_id?: string; puntuacion?: number; total?: number; aprobado?: boolean } = {};
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(`El servidor devolvió una respuesta no válida (HTTP ${response.status}).`);
        }
        if (!response.ok) throw new Error(data.error || `No se pudo guardar el resultado (HTTP ${response.status}).`);
        if (!data.intento_id || typeof data.puntuacion !== "number" || typeof data.total !== "number" || typeof data.aprobado !== "boolean") {
          throw new Error("El servidor no devolvió un resultado de test válido.");
        }
        setAttemptId(data.intento_id);
        if (data.aprobado) {
          window.localStorage.setItem("sdo-progreso-" + course.id, "100");
          window.localStorage.setItem(
            "sdo-resultado-" + course.id,
            JSON.stringify({
              attemptId: data.intento_id,
              score: data.puntuacion,
              total: data.total,
              answers,
            })
          );
        } else {
          window.localStorage.setItem("sdo-progreso-" + course.id, String(Math.min(99, Math.round((data.puntuacion / data.total) * 100))));
          window.localStorage.removeItem("sdo-resultado-" + course.id);
        }
        setPhase("result");
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "No se pudo guardar el resultado.");
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setCurrent((c) => c + 1);
  }
  function retry() {
    setAttemptId("");
    setSubmitError("");
    setAnswers(Array(questions.length).fill(-1));
    setCurrent(0);
    setPhase("quiz");
  }

  if (affiliated === null) return <div className="min-h-screen bg-slate-50" />;

  if (!affiliated && !internalPreview) {
    const returnTo = `/cursos/${course.id}/test`;
    return (
      <main className="min-h-screen bg-navy px-6 py-12 text-white">
        <div className="mx-auto max-w-2xl">
          <Link href={`/cursos/${course.id}`} className="text-sm font-bold text-slate-300 hover:text-safety">← Volver al curso</Link>
          <div className="mt-10 overflow-hidden rounded-3xl bg-white text-navy shadow-2xl">
            <div className="bg-navy px-6 py-10 text-center sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-safety bg-slate-950 text-2xl font-black text-safety">SO</div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-safety">Antes de comenzar el test</p>
              <h1 className="mt-3 text-3xl font-black text-white">Afíliate gratis al Sindicato</h1>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">El acceso a la formación y a los test es gratuito. Solo necesitamos que te unas gratis para darte acceso al área de formación.</p>
            </div>
            <div className="p-7 sm:p-10">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4 font-bold">✓ Afiliación gratuita</div>
                <div className="rounded-xl bg-slate-50 p-4 font-bold">✓ Temarios gratuitos</div>
                <div className="rounded-xl bg-slate-50 p-4 font-bold">✓ Test gratuitos</div>
                <div className="rounded-xl bg-slate-50 p-4 font-bold">✓ Certificado opcional tras aprobar</div>
              </div>
              <Link href={`/afiliarse?returnTo=${encodeURIComponent(returnTo)}`} className="mt-7 block rounded-xl bg-safety px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-navy shadow-lg hover:bg-safety-dark">
                Afiliarme gratis y hacer el test
              </Link>
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">No se cobra nada por afiliarte, estudiar ni realizar el test.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-navy text-white"><div className="mx-auto max-w-3xl px-6 py-8 sm:py-10">
        <Link href={`/cursos/${course.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-safety"><BackIcon />Volver al curso</Link>
        <div className="mt-5 flex flex-wrap items-center gap-3"><span className="inline-block rounded-md bg-safety px-3 py-1 text-xs font-black uppercase tracking-wide text-navy">Test 100% Gratuito</span><span className="text-xs font-semibold uppercase tracking-wide text-slate-300">Afiliado · acceso gratuito</span><span className="text-xs font-semibold uppercase tracking-wide text-slate-300">Aprobado: {PASS_MARK} / {TOTAL_QUESTIONS} aciertos</span></div>
        <h1 className="mt-4 text-balance text-2xl font-black leading-tight sm:text-3xl">Test Final · <span className="text-safety">{course.title.replace(/^Curso de /, "")}</span></h1>
        {phase === "quiz" && <div className="mt-6"><div className="flex items-center justify-between text-sm font-semibold text-slate-300"><span>Pregunta {current + 1} de {questions.length}</span><span>{Math.round(((current + 1) / questions.length) * 100)}%</span></div><div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-safety transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div></div>}
      </div></header>
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">{phase === "quiz" ? <QuizCard question={questions[current]} selected={selected} onSelect={select} onNext={next} isLast={isLast} submitting={submitting} submitError={submitError} /> : <ResultCard passed={passed} score={score} total={questions.length} course={course} attemptId={attemptId} questions={questions} answers={answers} onRetry={retry} />}</div>
    </main>
  );
}
function QuizCard({ question, selected, onSelect, onNext, isLast, submitting, submitError }: { question: ExamQuestion; selected: number; onSelect: (i: number) => void; onNext: () => void; isLast: boolean; submitting: boolean; submitError: string }) {
  const letters = ["A", "B", "C", "D"];
  return <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"><h2 className="text-balance text-xl font-black leading-snug text-navy sm:text-2xl">{question.q}</h2><div className="mt-6 grid gap-3">{question.options.map((option, i) => { const active = selected === i; return <button key={option} type="button" onClick={() => onSelect(i)} aria-pressed={active} className={`flex items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-all ${active ? "border-safety bg-safety/10 shadow-sm" : "border-slate-200 bg-white hover:border-navy/40 hover:bg-slate-50"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black ${active ? "bg-safety text-navy" : "bg-slate-100 text-slate-500"}`}>{letters[i]}</span><span className={`text-sm font-semibold leading-snug sm:text-base ${active ? "text-navy" : "text-slate-700"}`}>{option}</span></button>; })}</div><div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6"><p className="text-xs font-medium text-slate-400">Selecciona una respuesta para continuar</p><button type="button" onClick={onNext} disabled={selected === -1} className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40">{submitting ? "Guardando resultado…" : isLast ? "Finalizar Test" : "Siguiente Pregunta"}<ArrowIcon /></button></div></div>;
}
function ResultCard({ passed, score, total, course, attemptId, questions, answers, onRetry }: { passed: boolean; score: number; total: number; course: Course; attemptId: string; questions: ExamQuestion[]; answers: number[]; onRetry: () => void }) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
        <div className={`px-6 py-10 text-center sm:px-10 ${passed ? "bg-navy" : "bg-slate-800"}`}>
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-safety text-navy" : "bg-white/10 text-white"}`}>
            {passed ? <TrophyIcon /> : <RetryIcon />}
          </div>
          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">{passed ? "¡APROBADO!" : "NO APROBADO"}</h2>
          <p className="mt-3 text-pretty text-slate-300">
            {passed ? "Has superado el test final. Tu resultado ha quedado registrado." : `Necesitas al menos ${PASS_MARK} aciertos para aprobar. Repasa el temario y vuelve a intentarlo, es gratis.`}
          </p>
          <div className="mx-auto mt-6 inline-flex items-baseline gap-2 rounded-xl bg-white/10 px-6 py-3">
            <span className="text-4xl font-black text-safety">{score}</span>
            <span className="text-lg font-bold text-white/70">/ {total}</span>
            <span className="ml-2 text-sm font-semibold text-white/70">aciertos</span>
          </div>
          {passed && <p className="mt-4 text-sm font-bold text-safety">✓ APTO · 70 % mínimo superado</p>}
        </div>
        <div className="p-6 sm:p-10">
          {passed ? (
            <div className="flex flex-col gap-4">
              <a href={`/certificado/${course.id}?score=${score}&total=${total}&intento=${encodeURIComponent(attemptId)}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark">
                Obtener diploma / certificado · 4,99 € <ArrowIcon />
              </a>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <p className="text-sm font-black uppercase tracking-wide text-emerald-700">✓ APROBADO Y REGISTRADO</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-800">El test es gratuito. Si quieres tu diploma/certificado, continúa con el pago de 4,99 €. Después podrás descargar el PDF.</p>
              </div>
              <Link href={`/cursos/${course.id}`} className="text-center text-sm font-semibold text-slate-500 transition-colors hover:text-navy">Volver al temario del curso</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href={`/cursos/${course.id}`} className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-navy bg-white px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-sm transition-colors hover:bg-slate-50">Repasar el temario<ArrowIcon /></Link>
              <button type="button" onClick={onRetry} className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-navy-light"><RetryIcon />Repetir Test Gratis</button>
              <p className="text-center text-sm leading-relaxed text-slate-500">No has obtenido el apto. Repasa el temario y vuelve a intentarlo gratis. No se realiza ningún pago por suspender.</p>
            </div>
          )}
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
          <h3 className="text-xl font-black text-navy">Revisión de tus respuestas</h3>
          <p className="mt-1 text-sm text-slate-500">Comprueba qué has acertado y cuál era la respuesta correcta en cada pregunta.</p>
        </div>
        <div className="divide-y divide-slate-200">
          {questions.map((question, index) => {
            const selected = answers[index];
            const correct = selected === question.answer;
            return (
              <article key={index} className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {correct ? "✓" : "✕"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black leading-6 text-navy sm:text-base"><span className="text-slate-400">Pregunta {index + 1}.</span> {question.q}</p>
                    <p className={`mt-3 text-sm leading-6 ${correct ? "text-emerald-700" : "text-red-700"}`}>
                      <span className="font-black">{correct ? "Tu respuesta: " : "Tu respuesta: "}</span>
                      {selected >= 0 ? question.options[selected] : "Sin respuesta"}
                    </p>
                    {!correct && (
                      <p className="mt-1 text-sm leading-6 text-emerald-700">
                        <span className="font-black">Respuesta correcta:</span> {question.options[question.answer]}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ArrowIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function BackIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function TrophyIcon() { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function RetryIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
