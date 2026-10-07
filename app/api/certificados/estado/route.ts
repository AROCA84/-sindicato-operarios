import { NextResponse } from "next/server";
import { TOTAL_QUESTIONS } from "@/lib/exam-config";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const code = new URL(request.url).searchParams.get("codigo")?.trim();
    if (!code) return NextResponse.json({ error: "Código requerido." }, { status: 400 });
    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    // Query by REAL column: codigo_certificado
    const response = await supabaseFetch(
      `${url}/rest/v1/certificados?select=codigo_certificado,curso_id,puntuacion,total_preguntas,pago_realizado,estado,fecha_emision,afiliado_id,nombre,numero_afiliado&codigo_certificado=eq.${encodeURIComponent(code)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!response.ok) return NextResponse.json({ error: "No se pudo consultar el certificado." }, { status: 502 });
    const rows = await response.json() as Array<{
      codigo_certificado: string; curso_id: string; puntuacion: number; total_preguntas: number;
      pago_realizado: boolean; estado: string; fecha_emision: string | null; afiliado_id: string;
      nombre: string | null; numero_afiliado: number | string | null;
    }>;
    if (!rows.length) return NextResponse.json({ ok: false, estado: "no_encontrado" }, { status: 404 });

    const cert = rows[0];
    // Normalize: emitido = pago_realizado AND estado === "emitido"
    const emitido = cert.pago_realizado && cert.estado === "emitido";
    return NextResponse.json({
      ok: true,
      emitido,
      total: cert.total_preguntas || TOTAL_QUESTIONS,
      // Normalized fields for frontend compatibility
      codigo: cert.codigo_certificado,
      curso_id: cert.curso_id,
      puntuacion: cert.puntuacion,
      estado_pago: cert.pago_realizado ? "pagado" : "pendiente",
      estado_emision: cert.estado,
      emitido_at: cert.fecha_emision,
      afiliado_id: cert.afiliado_id,
      // Holder data is only needed (and only revealed) once the certificate is issued.
      nombre: emitido ? cert.nombre : null,
      numero_afiliado: emitido ? cert.numero_afiliado : null,
    });
  } catch {
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
