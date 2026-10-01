import { NextResponse } from "next/server";
import { allCourses } from "@/lib/academy-catalog";
import { getExam, PASS_MARK, TOTAL_QUESTIONS } from "@/lib/exam";

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

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; numero_afiliado?: number | string; curso_id?: string; respuestas?: unknown };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero_afiliado);
    const cursoId = body.curso_id?.trim();
    const answers = Array.isArray(body.respuestas) ? body.respuestas.map(Number) : [];

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId ||
        answers.length !== TOTAL_QUESTIONS || answers.some((a) => !Number.isInteger(a) || a < 0 || a > 3)) {
      return NextResponse.json({ error: "Datos del test no válidos." }, { status: 400 });
    }

    const course = allCourses.find((item) => item.id === cursoId);
    if (!course) return NextResponse.json({ error: "Curso no encontrado." }, { status: 404 });

    const questions = getExam(course);
    if (questions.length !== TOTAL_QUESTIONS) return NextResponse.json({ error: "El examen no está disponible correctamente." }, { status: 500 });

    const puntuacion = answers.reduce((s, a, i) => s + (a === questions[i].answer ? 1 : 0), 0);
    const aprobado = puntuacion >= PASS_MARK;

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,email,activo&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; email: string }>;
    if (!members.length) return NextResponse.json({ error: "No encontramos una afiliación activa con esos datos." }, { status: 401 });

    const insert = await supabaseFetch(`${url}/rest/v1/intentos_test`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({ afiliado_id: members[0].id, curso_id: cursoId, puntuacion, total: TOTAL_QUESTIONS, aprobado, respuestas: answers }),
      cache: "no-store",
    });
    if (!insert.ok) {
      console.error("Test attempt creation error:", await insert.text());
      return NextResponse.json({ error: "No se pudo guardar el resultado del test." }, { status: 502 });
    }

    const rows = await insert.json() as Array<{ id: string }>;
    if (!rows[0]?.id) return NextResponse.json({ error: "No se recibió el identificador del intento." }, { status: 502 });

    return NextResponse.json({ ok: true, intento_id: rows[0].id, puntuacion, total: TOTAL_QUESTIONS, aprobado });
  } catch (error) {
    console.error("Test submit error:", error);
    return NextResponse.json({ error: "Error del servidor al guardar el test." }, { status: 500 });
  }
}
