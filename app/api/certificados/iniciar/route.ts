import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

const SUPABASE_TIMEOUT_MS = 10000;

async function supabaseFetch(input: RequestInfo | URL, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);
  try { return await fetch(input, { ...init, signal: controller.signal }); }
  finally { clearTimeout(timeout); }
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
    const body = await request.json() as {
      email?: string; numero_afiliado?: number | string; curso_id?: string; intento_id?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero_afiliado);
    const cursoId = body.curso_id?.trim();
    const intentoId = body.intento_id?.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId || !intentoId) {
      return NextResponse.json({ error: "Datos del certificado no válidos." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const attemptResponse = await supabaseFetch(
      `${url}/rest/v1/intentos_test?select=id,afiliado_id,curso_id,puntuacion,total,aprobado&id=eq.${encodeURIComponent(intentoId)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!attemptResponse.ok) return NextResponse.json({ error: "No se pudo comprobar el resultado del test." }, { status: 502 });
    const attempts = await attemptResponse.json() as Array<{ id: string; afiliado_id: string; curso_id: string; puntuacion: number; total: number; aprobado: boolean }>;
    if (!attempts.length || attempts[0].curso_id !== cursoId || attempts[0].total !== 20 || attempts[0].puntuacion < 14 || !attempts[0].aprobado) {
      return NextResponse.json({ error: "El certificado solo está disponible después de aprobar el test con al menos el 70 %." }, { status: 403 });
    }

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "No encontramos una afiliación activa con esos datos." }, { status: 401 });
    if (attempts[0].afiliado_id !== members[0].id) return NextResponse.json({ error: "El intento de test no pertenece a esta afiliación." }, { status: 403 });

    const code = `SDO-${new Date().getFullYear()}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
    const insert = await supabaseFetch(`${url}/rest/v1/certificados`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({
        afiliado_id: members[0].id,
        curso_id: cursoId,
        codigo: code,
        puntuacion: attempts[0].puntuacion,
        total: attempts[0].total,
        estado_pago: "pendiente",
        estado_emision: "pendiente",
      }),
      cache: "no-store",
    });
    if (!insert.ok) {
      const detail = await insert.text();
      console.error("Certificate creation error:", detail);
      return NextResponse.json({ error: "No se pudo crear la solicitud de certificado." }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      codigo: code,
      numero_afiliado: members[0].numero_afiliado,
      nombre: members[0].nombre,
      apellidos: members[0].apellidos,
      email: members[0].email,
      estado_pago: "pendiente",
      estado_emision: "pendiente",
      payment_url: `/api/certificados/pago?codigo=${encodeURIComponent(code)}`,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return NextResponse.json({ error: "La base de datos tardó demasiado en responder. Inténtalo de nuevo." }, { status: 504 });
    console.error("Certificate start error:", error);
    return NextResponse.json({ error: "Error del servidor al iniciar el certificado." }, { status: 500 });
  }
}
