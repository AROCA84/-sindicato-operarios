import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AffiliateBody = {
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AffiliateBody;
    const nombre = body.nombre?.trim();
    const apellidos = body.apellidos?.trim();
    const email = body.email?.trim().toLowerCase();
    const telefono = body.telefono?.trim() || null;

    if (!nombre || !apellidos || !email) {
      return NextResponse.json(
        { error: "Nombre, apellidos y correo electrónico son obligatorios." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Introduce un correo electrónico válido." },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "La conexión con la base de datos todavía no está configurada en el servidor." },
        { status: 503 }
      );
    }

    const baseUrl = supabaseUrl.replace(/\/$/, "");
    const headers = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
    };

    const existingResponse = await fetch(
      `${baseUrl}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&email=eq.${encodeURIComponent(email)}&limit=1`,
      { headers, cache: "no-store" }
    );

    if (!existingResponse.ok) {
      const detail = await existingResponse.text();
      console.error("Supabase lookup error:", detail);
      return NextResponse.json(
        { error: "No se ha podido comprobar el correo en la base de datos." },
        { status: 502 }
      );
    }

    const existing = (await existingResponse.json()) as Array<{
      id: string;
      numero_afiliado: number;
      nombre: string;
      apellidos: string;
      email: string;
    }>;

    if (existing.length > 0) {
      const affiliate = existing[0];
      return NextResponse.json({
        ok: true,
        existing: true,
        numero_afiliado: affiliate.numero_afiliado,
        nombre: affiliate.nombre,
        apellidos: affiliate.apellidos,
        email: affiliate.email,
      });
    }

    const insertResponse = await fetch(`${baseUrl}/rest/v1/afiliados`, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        email,
        ...(telefono ? { Teléfono: telefono } : {}),
      }),
      cache: "no-store",
    });

    if (!insertResponse.ok) {
      const detail = await insertResponse.text();
      console.error("Supabase insert error:", detail);
      return NextResponse.json(
        { error: "No se ha podido crear la afiliación. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    const rows = (await insertResponse.json()) as Array<{
      id: string;
      numero_afiliado: number;
      nombre: string;
      apellidos: string;
      email: string;
    }>;

    const affiliate = rows[0];

    return NextResponse.json({
      ok: true,
      existing: false,
      numero_afiliado: affiliate.numero_afiliado,
      nombre: affiliate.nombre,
      apellidos: affiliate.apellidos,
      email: affiliate.email,
    });
  } catch (error) {
    console.error("Affiliate API error:", error);
    return NextResponse.json(
      { error: "Se ha producido un error inesperado. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
