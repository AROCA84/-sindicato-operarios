import { NextResponse } from "next/server";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; numero?: string | number };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero);
    if (!email || !Number.isInteger(numero)) return NextResponse.json({ error: "Datos no válidos." }, { status: 400 });
    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "Afiliación no encontrada." }, { status: 401 });
    const member = members[0];

    // Query with REAL columns: codigo_certificado, total_preguntas, pago_realizado, estado, fecha_emision
    const response = await supabaseFetch(
      `${url}/rest/v1/certificados?select=codigo_certificado,curso_id,puntuacion,total_preguntas,pago_realizado,estado,fecha_emision&afiliado_id=eq.${encodeURIComponent(member.id)}&pago_realizado=eq.true&estado=eq.emitido&order=fecha_emision.desc`,
      { headers: h, cache: "no-store" }
    );
    if (!response.ok) return NextResponse.json({ error: "No se pudieron consultar los certificados." }, { status: 502 });
    const rows = await response.json() as Array<{
      codigo_certificado: string; curso_id: string; puntuacion: number; total_preguntas: number;
      pago_realizado: boolean; estado: string; fecha_emision: string | null;
    }>;

    // Normalize for frontend compatibility
    const certificados = rows.map((r) => ({
      codigo: r.codigo_certificado,
      curso_id: r.curso_id,
      puntuacion: r.puntuacion,
      total: r.total_preguntas || 20,
      estado_pago: r.pago_realizado ? "pagado" : "pendiente",
      estado_emision: r.estado,
      emitido_at: r.fecha_emision,
    }));

    return NextResponse.json({ ok: true, certificados });
  } catch {
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
