import { NextResponse } from "next/server";

export const runtime = "nodejs";

function config() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; numero?: string | number };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero);
    if (!email || !Number.isInteger(numero)) return NextResponse.json({ error: "Datos no válidos." }, { status: 400 });
    const { url, key } = config();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
    if (!key.startsWith("sb_secret_")) headers.Authorization = "Bearer " + key;
    const memberResponse = await fetch(
      url + "/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq." + numero + "&email=eq." + encodeURIComponent(email) + "&activo=eq.true&limit=1",
      { headers, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "Afiliación no encontrada." }, { status: 401 });
    const member = members[0];
    const response = await fetch(
      url + "/rest/v1/certificados?select=codigo,curso_id,puntuacion,total,estado_pago,estado_emision,emitido_at&afiliado_id=eq." + member.id + "&estado_pago=eq.pagado&estado_emision=eq.emitido&order=emitido_at.desc",
      { headers, cache: "no-store" }
    );
    if (!response.ok) return NextResponse.json({ error: "No se pudieron consultar los certificados." }, { status: 502 });
    const certificados = await response.json();
    return NextResponse.json({ ok: true, certificados });
  } catch {
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
