import { NextResponse } from "next/server";
import { headers, supabaseConfig, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nombre = String(body.nombre || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!nombre || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Introduce tu nombre y correo electrónico." },
        { status: 400 }
      );
    }

    // Reuse the shared configuration so Mi área accepts the same Supabase
    // environment-variable aliases as affiliation, certificates and tests.
    const { url, key } = supabaseConfig();
    if (!url || !key) {
      console.error("Mi área login: Supabase server configuration is missing.");
      return NextResponse.json(
        { ok: false, error: "El acceso a Mi área no está configurado correctamente. Contacta con soporte." },
        { status: 503 }
      );
    }

    const response = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=numero_afiliado,nombre,apellidos,email&nombre=ilike.${encodeURIComponent(nombre)}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: headers(key), cache: "no-store" }
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("Mi área login: Supabase returned", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "No se ha podido comprobar el acceso. Inténtalo de nuevo más tarde." },
        { status: 502 }
      );
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || !rows[0]) {
      return NextResponse.json(
        { ok: false, error: "No encontramos una afiliación activa con ese nombre y correo." },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true, afiliado: rows[0] });
  } catch (error) {
    console.error("Mi área login error:", error);
    return NextResponse.json(
      { ok: false, error: "No se ha podido iniciar sesión. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
