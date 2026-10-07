import { PASS_MARK, TOTAL_QUESTIONS } from "@/lib/exam-config";

/** Browser-side helpers. localStorage is only a UI cache: Supabase is the source of truth. */

export type StoredAffiliate = { numero: string; email: string };

export type ApprovedResult = {
  attemptId: string;
  score: number;
  total: number;
  answers: number[] | null;
  correct: number[] | null;
};

const resultKey = (courseId: string) => "sdo-resultado-" + courseId;

/** An affiliate session needs the number and email: the APIs reject requests without them. */
export function getStoredAffiliate(): StoredAffiliate | null {
  if (window.localStorage.getItem("sdo-afiliado") !== "true") return null;
  const numero = window.localStorage.getItem("sdo-numero-afiliado") || "";
  const email = window.localStorage.getItem("sdo-afiliado-email") || "";
  return numero && email ? { numero, email } : null;
}

function toNumberList(value: unknown): number[] | null {
  return Array.isArray(value) && value.length === TOTAL_QUESTIONS ? value.map(Number) : null;
}

export function readCachedResult(courseId: string): ApprovedResult | null {
  const raw = window.localStorage.getItem(resultKey(courseId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ApprovedResult>;
    if (typeof parsed.attemptId !== "string" || typeof parsed.score !== "number" || parsed.score < PASS_MARK || parsed.total !== TOTAL_QUESTIONS) return null;
    return { attemptId: parsed.attemptId, score: parsed.score, total: parsed.total, answers: toNumberList(parsed.answers), correct: toNumberList(parsed.correct) };
  } catch {
    return null;
  }
}

export function cacheResult(courseId: string, result: ApprovedResult) {
  window.localStorage.setItem("sdo-progreso-" + courseId, "100");
  window.localStorage.setItem(resultKey(courseId), JSON.stringify(result));
}

export function clearCachedResult(courseId: string) {
  window.localStorage.removeItem(resultKey(courseId));
}

/**
 * Ask the server for an approved attempt.
 * Returns the result, `null` when the server confirms there is none, or "error"
 * when it could not be checked (the cached result must then be kept).
 */
export async function fetchApprovedResult(courseId: string, affiliate: StoredAffiliate, signal?: AbortSignal): Promise<ApprovedResult | null | "error"> {
  try {
    const response = await fetch(
      `/api/tests/result?email=${encodeURIComponent(affiliate.email)}&numero_afiliado=${encodeURIComponent(affiliate.numero)}&curso_id=${encodeURIComponent(courseId)}`,
      { cache: "no-store", signal }
    );
    if (!response.ok) return "error";
    const data = await response.json();
    if (!data?.found) return null;
    if (data.aprobado !== true || typeof data.intento_id !== "string" || typeof data.puntuacion !== "number" || data.puntuacion < PASS_MARK) return null;
    return {
      attemptId: data.intento_id,
      score: data.puntuacion,
      total: typeof data.total === "number" ? data.total : TOTAL_QUESTIONS,
      answers: toNumberList(data.respuestas),
      correct: toNumberList(data.correctas),
    };
  } catch {
    return "error";
  }
}
