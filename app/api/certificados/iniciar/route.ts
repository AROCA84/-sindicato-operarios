import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

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
      email?: string; numero_afiliado?: number | string; curso_id?: string; puntuacion?: number; total?: number;
    };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero_afiliado);
    const cursoId = body.curso_id?.trim();
    const puntuacion = Number(body.puntuacion);
    const total = Number(body.total);

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId ||
        !Number.isInteger(puntuacion) || !Number.isInteger(total) || total <= 0 || puntuacion < 0 || puntuacion > total) {
      return NextResponse.json({ error: "Datos del certificado no válidos." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const memberResponse = await fetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "No encontramos una afiliación activa con esos datos." }, { status: 401 });

    const code = `SDO-${new Date().getFullYear()}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
    const insert = await fetch(`${url}/rest/v1/certificados`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({
        afiliado_id: members[0].id,
        curso_id: cursoId,
        codigo: code,
        puntuacion,
        total,
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
      payment_url: process.env.MYPOS_PAYMENT_URL || "https://mypos.com/@sindicato499/4.99",
    });
  } catch (error) {
    console.error("Certificate start error:", error);
    return NextResponse.json({ error: "Error del servidor al iniciar el certificado." }, { status: 500 });
  }
}
