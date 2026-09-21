"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Course } from "@/lib/courses";
import {
  getExam,
  PASS_MARK,
  TOTAL_QUESTIONS,
  type ExamQuestion,
} from "@/lib/exam";

type Phase = "quiz" | "result";

export function CourseExam({ course }: { course: Course }) {
  const questions = useMemo(() => getExam(course), [course]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    Array(questions.length).fill(-1),
  );
  const [phase, setPhase] = useState<Phase>("quiz");

  const total = questions.length;
  const selected = answers[current];
  const isLast = current === total - 1;

  const score = useMemo(
    () =>
      answers.reduce(
        (acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc),
        0,
      ),
    [answers, questions],
  );

  const passed = score >= PASS_MARK;

  function select(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  }

  function next() {
    if (isLast) {
      setPhase("result");
      return;
    }
    setCurrent((c) => c + 1);
  }

  function retry() {
    setAnswers(Array(questions.length).fill(-1));
    setCurrent(0);
    setPhase("quiz");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Exam header */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-6 py-8 sm:py-10">
          <Link
            href={`/cursos/${course.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-safety"
          >
            <BackIcon />
            Volver al curso
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-md bg-safety px-3 py-1 text-xs font-black uppercase tracking-wide text-navy">
              Test 100% Gratuito
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Aprobado: {PASS_MARK} / {TOTAL_QUESTIONS} aciertos
            </span>
          </div>

          <h1 className="mt-4 text-balance text-2xl font-black leading-tight sm:text-3xl">
            Examen Oficial ·{" "}
            <span className="text-safety">
              {course.title.replace(/^Curso de /, "")}
            </span>
          </h1>

          {phase === "quiz" && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                <span>
                  Pregunta {current + 1} de {total}
                </span>
                <span>
                  {Math.round(((current + 1) / total) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-safety transition-all duration-300"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        {phase === "quiz" ? (
          <QuizCard
            question={questions[current]}
            selected={selected}
            onSelect={select}
            onNext={next}
            isLast={isLast}
          />
        ) : (
          <ResultCard
            passed={passed}
            score={score}
            total={total}
            course={course}
            onRetry={retry}
          />
        )}
      </div>
    </main>
  );
}

function QuizCard({
  question,
  selected,
  onSelect,
  onNext,
  isLast,
}: {
  question: ExamQuestion;
  selected: number;
  onSelect: (i: number) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <h2 className="text-balance text-xl font-black leading-snug text-navy sm:text-2xl">
        {question.q}
      </h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option, i) => {
          const active = selected === i;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={active}
              className={`flex items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-all ${
                active
                  ? "border-safety bg-safety/10 shadow-sm"
                  : "border-slate-200 bg-white hover:border-navy/40 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black ${
                  active
                    ? "bg-safety text-navy"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {letters[i]}
              </span>
              <span
                className={`text-sm font-semibold leading-snug sm:text-base ${
                  active ? "text-navy" : "text-slate-700"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <p className="text-xs font-medium text-slate-400">
          Selecciona una respuesta para continuar
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={selected === -1}
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? "Finalizar Test" : "Siguiente Pregunta"}
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function ResultCard({
  passed,
  score,
  total,
  course,
  onRetry,
}: {
  passed: boolean;
  score: number;
  total: number;
  course: Course;
  onRetry: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
      <div
        className={`px-6 py-10 text-center sm:px-10 ${
          passed ? "bg-navy" : "bg-slate-800"
        }`}
      >
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            passed ? "bg-safety text-navy" : "bg-white/10 text-white"
          }`}
        >
          {passed ? <TrophyIcon /> : <RetryIcon />}
        </div>
        <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
          {passed ? "¡APROBADO!" : "Casi lo tienes"}
        </h2>
        <p className="mt-3 text-pretty text-slate-300">
          {passed
            ? "Has superado el examen oficial. ¡Enhorabuena!"
            : `Necesitas al menos ${PASS_MARK} aciertos para aprobar. Repasa el temario y vuelve a intentarlo, es gratis.`}
        </p>

        <div className="mx-auto mt-6 inline-flex items-baseline gap-2 rounded-xl bg-white/10 px-6 py-3">
          <span className="text-4xl font-black text-safety">{score}</span>
          <span className="text-lg font-bold text-white/70">/ {total}</span>
          <span className="ml-2 text-sm font-semibold text-white/70">
            aciertos
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {passed ? (
          <div className="flex flex-col gap-4">
            <a
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-safety px-8 py-4 text-base font-black uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-safety-dark"
            >
              Ver Resultado y Tramitar Certificado
              <ArrowIcon />
            </a>
            <Link
              href={`/cursos/${course.id}`}
              className="text-center text-sm font-semibold text-slate-500 transition-colors hover:text-navy"
            >
              Volver al temario del curso
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-navy-light"
            >
              <RetryIcon />
              Repetir Test Gratis
            </button>
            <Link
              href={`/cursos/${course.id}`}
              className="text-center text-sm font-semibold text-slate-500 transition-colors hover:text-navy"
            >
              Repasar el temario antes de reintentar
            </Link>
          </div>
        )}
      </div>
    </div>
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

function TrophyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RetryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
