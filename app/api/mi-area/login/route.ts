import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nombre = String(body.nombre || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!nombre || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Introduce tu nombre y correo electrónico." }, { status: 400 });
    }

    const url = process.env.SUPABASE_URL;
    const rawKey = process.env.SUPABASE_SECRET_KEY;
    const key = rawKey?.trim();
    if (!url || !key) {
      return NextResponse.json({ ok: false, error: "Servicio no configurado." }, { status: 500 });
    }

    const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
    if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;

    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/afiliados?select=numero_afiliado,nombre,apellidos,email,activo&nombre=ilike.${encodeURIComponent(nombre)}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers, cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "No se ha podido comprobar el acceso." }, { status: 502 });
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || !rows[0]) {
      return NextResponse.json({ ok: false, error: "No encontramos una afiliación activa con ese nombre y correo." }, { status: 401 });
    }

    return NextResponse.json({ ok: true, afiliado: rows[0] });
  } catch {
    return NextResponse.json({ ok: false, error: "No se ha podido iniciar sesión." }, { status: 500 });
  }
}