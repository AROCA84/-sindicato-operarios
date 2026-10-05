import { NextResponse } from "next/server";

export const runtime = "nodejs";

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}

export async function GET(request: Request) {
  try {
    const code = new URL(request.url).searchParams.get("codigo")?.trim();
    if (!code) return NextResponse.json({ error: "Código requerido." }, { status: 400 });
    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h: Record<string, string> = { apikey: key };
    if (!key.startsWith("sb_secret_")) h.Authorization = `Bearer ${key}`;

    const response = await fetch(
      `${url}/rest/v1/certificados?select=codigo,curso_id,puntuacion,estado_pago,estado_emision,emitido_at,afiliado_id&codigo=eq.${encodeURIComponent(code)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!response.ok) return NextResponse.json({ error: "No se pudo consultar el certificado." }, { status: 502 });
    const rows = await response.json() as Array<{
      codigo: string; curso_id: string; puntuacion: number;
      estado_pago: string; estado_emision: string; emitido_at: string | null; afiliado_id: string;
    }>;
    if (!rows.length) return NextResponse.json({ ok: false, estado: "no_encontrado" }, { status: 404 });

    const cert = rows[0];
    const emitido = cert.estado_pago === "pagado" && cert.estado_emision === "emitido";
    return NextResponse.json({ ok: true, emitido, total: 20, ...cert });
  } catch {
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
