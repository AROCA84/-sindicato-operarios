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
    // Vercel/Supabase secrets must be ASCII in HTTP headers. When a key is
    // copied from a formatted screen, an invisible Unicode character can
    // occasionally be introduced and make fetch() fail before reaching Supabase.
    const rawSupabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseKey = rawSupabaseKey
      ?.trim()
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .replace(/[•·]/g, "");

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "La conexión con la base de datos todavía no está configurada en el servidor." },
        { status: 503 }
      );
    }

    const baseUrl = supabaseUrl.replace(/\/$/, "");
    // Supabase's new sb_secret_* keys must be sent in the apikey header.
    // Sending an sb_secret_* key as "Authorization: Bearer ..." can make
    // Supabase treat it as a JWT and reject the request. Legacy
    // service_role keys still use the Authorization header.
    const isNewSecretKey = supabaseKey.startsWith("sb_secret_");
    const headers: Record<string, string> = {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      ...(isNewSecretKey
        ? {}
        : { Authorization: `Bearer ${supabaseKey}` }),
    };

    const existingResponse = await fetch(
      `${baseUrl}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&email=eq.${encodeURIComponent(email)}&limit=1`,
      { headers, cache: "no-store" }
    );

    if (!existingResponse.ok) {
      const detail = await existingResponse.text();
      console.error("Supabase lookup error:", detail);
      return NextResponse.json(
        { error: "No se ha podido comprobar el correo en la base de datos.", detail },
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
        ...(telefono ? { telefono } : {}),
      }),
      cache: "no-store",
    });

    if (!insertResponse.ok) {
      const detail = await insertResponse.text();
      console.error("Supabase insert error:", detail);

      // Si dos solicitudes llegan casi a la vez con el mismo correo,
      // la restricción UNIQUE de Supabase puede producir un 409.
      // En ese caso recuperamos el afiliado existente en lugar de mostrar un error.
      if (insertResponse.status === 409) {
        const conflictResponse = await fetch(
          `${baseUrl}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&email=eq.${encodeURIComponent(email)}&limit=1`,
          { headers, cache: "no-store" }
        );

        if (conflictResponse.ok) {
          const conflictRows = (await conflictResponse.json()) as Array<{
            id: string;
            numero_afiliado: number;
            nombre: string;
            apellidos: string;
            email: string;
          }>;

          if (conflictRows.length > 0) {
            const affiliate = conflictRows[0];
            return NextResponse.json({
              ok: true,
              existing: true,
              numero_afiliado: affiliate.numero_afiliado,
              nombre: affiliate.nombre,
              apellidos: affiliate.apellidos,
              email: affiliate.email,
            });
          }
        }
      }

      return NextResponse.json(
        { error: "No se ha podido crear la afiliación.", detail },
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
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error del servidor al procesar la afiliación.", detail },
      { status: 500 }
    );
  }
}
