import { allCourses } from "@/lib/academy-catalog";
import { courses } from "@/lib/courses";

/**
 * Shared Supabase server helpers.
 *
 * IMPORTANT: The production database schema differs from supabase/schema.sql.
 * Real columns verified via the Supabase connector:
 *
 * intentos_test: id, afiliado_id(uuid,nullable), curso_id(uuid,nullable→text after migration),
 *   nombre(text,NOT NULL), email(text,NOT NULL), respuestas(jsonb),
 *   puntuacion(int,default 0), total_preguntas(int,default 0), aprobado(bool,default false),
 *   fecha_intento(timestamptz,default now()), created_at(timestamptz,default now())
 *
 * certificados: id, afiliado_id(uuid,nullable), curso_id(uuid,nullable→text after migration),
 *   nombre(text,NOT NULL), email(text,NOT NULL), numero_afiliado(bigint,nullable),
 *   codigo_certificado(text,unique), puntuacion(int,default 0), total_preguntas(int,default 0),
 *   aprobado(bool,default false), pago_realizado(bool,default false),
 *   importe_pago(numeric,default 4.99), estado(text,default 'pendiente'),
 *   pdf_url(text), whatsapp(text), whatsapp_enviado(bool,default false),
 *   whatsapp_enviado_at(timestamptz), fecha_emision(timestamptz), created_at, updated_at
 *
 * afiliados: id, numero_afiliado, nombre, apellidos, email, telefono, whatsapp,
 *   fecha_alta, activo, created_at, updated_at
 */

const SUPABASE_TIMEOUT_MS = 10000;

export async function supabaseFetch(input: RequestInfo | URL, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}

export function headers(key: string): Record<string, string> {
  const h: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) h.Authorization = `Bearer ${key}`;
  return h;
}

/**
 * Map a course slug from the frontend to the slug used in the `cursos` table.
 *
 * The code's `courses.ts` uses short IDs (e.g. "retropala") while the DB uses
 * slightly different slugs (e.g. "retropala-mixta"). This mapping ensures we
 * always use the correct slug when looking up a course UUID.
 */
const SLUG_MAP: Record<string, string> = {
  retropala: "retropala-mixta",
  telescopica: "carretilla-telescopica",
  "prl-almacen": "prl",
  "gestion-almacen": "gestion-almacen-stock",
};

/**
 * Resolve a course slug to its UUID in the `cursos` table.
 * Returns the slug itself if no matching course is found (after the migration
 * that changes curso_id to text, the slug can be stored directly).
 */
export async function resolveCourseUuid(
  url: string,
  key: string,
  courseSlug: string
): Promise<string> {
  const dbSlug = SLUG_MAP[courseSlug] ?? courseSlug;
  const h = headers(key);
  const response = await supabaseFetch(
    `${url}/rest/v1/cursos?select=id&slug=eq.${encodeURIComponent(dbSlug)}&limit=1`,
    { headers: h, cache: "no-store" }
  );
  if (response.ok) {
    const rows = (await response.json()) as Array<{ id: string }>;
    if (rows[0]?.id) return rows[0].id;
  }
  // Fallback: return the original slug (works after curso_id is changed to text)
  return courseSlug;
}

/**
 * Get the full course title from the in-memory catalog.
 * Used for display purposes when the DB doesn't have the course.
 */
export function getCourseTitle(courseId: string): string {
  const course = allCourses.find((c) => c.id === courseId) ??
    courses.find((c) => c.id === courseId);
  return course?.title ?? courseId;
}
