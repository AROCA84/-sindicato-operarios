import { NextResponse } from "next/server";
import { PASS_MARK, TOTAL_QUESTIONS } from "@/lib/exam";

export const runtime = "nodejs";

const SUPABASE_TIMEOUT_MS = 10000;

async function supabaseFetch(input: RequestInfo | URL, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}

function headers(key: string) {
  const h: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) h.Authorization = `Bearer ${key}`;
  return h;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();
    const numero = Number(searchParams.get("numero_afiliado"));
    const cursoId = searchParams.get("curso_id")?.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId) {
      return NextResponse.json({ error: "Datos de consulta no válidos." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string }>;
    if (!members.length) return NextResponse.json({ found: false });

    const attemptsResponse = await supabaseFetch(
      `${url}/rest/v1/intentos_test?select=id,curso_id,puntuacion,aprobado,respuestas&afiliado_id=eq.${encodeURIComponent(members[0].id)}&curso_id=eq.${encodeURIComponent(cursoId)}&aprobado=eq.true&puntuacion=gte.${PASS_MARK}&order=id.desc&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!attemptsResponse.ok) return NextResponse.json({ error: "No se pudo consultar el resultado del test." }, { status: 502 });

    const attempts = await attemptsResponse.json() as Array<{
      id: string;
      curso_id: string;
      puntuacion: number;
      aprobado: boolean;
      respuestas?: unknown;
    }>;
    const attempt = attempts[0];

    if (
      !attempt ||
      !attempt.aprobado ||
      typeof attempt.puntuacion !== "number" ||
      attempt.puntuacion < PASS_MARK
    ) {
      return NextResponse.json({ found: false });
    }

    const hasAnswers =
      Array.isArray(attempt.respuestas) &&
      attempt.respuestas.length === TOTAL_QUESTIONS;

    return NextResponse.json({
      found: true,
      intento_id: attempt.id,
      puntuacion: attempt.puntuacion,
      total: TOTAL_QUESTIONS,
      aprobado: true,
      respuestas: hasAnswers ? attempt.respuestas!.map(Number) : null,
    });
  } catch (error) {
    console.error("Test result lookup error:", error);
    return NextResponse.json({ error: "Error del servidor al consultar el resultado." }, { status: 500 });
  }
}
