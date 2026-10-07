import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { PASS_MARK, TOTAL_QUESTIONS } from "@/lib/exam";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

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

    // Validate the attempt is real and approved — server-side, not client-controllable
    const attemptResponse = await supabaseFetch(
      `${url}/rest/v1/intentos_test?select=id,afiliado_id,curso_id,puntuacion,aprobado,total_preguntas&id=eq.${encodeURIComponent(intentoId)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!attemptResponse.ok) return NextResponse.json({ error: "No se pudo comprobar el resultado del test." }, { status: 502 });
    const attempts = await attemptResponse.json() as Array<{ id: string; afiliado_id: string; curso_id: string; puntuacion: number; aprobado: boolean; total_preguntas?: number }>;
    if (!attempts.length || attempts[0].curso_id !== cursoId || attempts[0].puntuacion < PASS_MARK || !attempts[0].aprobado) {
      return NextResponse.json({ error: "El certificado solo está disponible después de aprobar el test con al menos el 70 %." }, { status: 403 });
    }

    // Validate the afiliado and ownership of the attempt
    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "No encontramos una afiliación activa con esos datos." }, { status: 401 });
    if (attempts[0].afiliado_id !== members[0].id) return NextResponse.json({ error: "El intento de test no pertenece a esta afiliación." }, { status: 403 });

    const member = members[0];
    const nombreCompleto = `${member.nombre} ${member.apellidos}`.trim();

    // Check if a certificate already exists for this attempt/course/afiliado
    const existingResponse = await supabaseFetch(
      `${url}/rest/v1/certificados?select=codigo_certificado,estado,pago_realizado,intento_id&afiliado_id=eq.${encodeURIComponent(member.id)}&curso_id=eq.${encodeURIComponent(cursoId)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (existingResponse.ok) {
      const existing = await existingResponse.json() as Array<{ codigo_certificado: string; estado: string; pago_realizado: boolean; intento_id?: string | null }>;
      if (existing.length > 0) {
        const match = existing[0];
        return NextResponse.json({
          ok: true,
          codigo: match.codigo_certificado,
          numero_afiliado: member.numero_afiliado,
          nombre: member.nombre,
          apellidos: member.apellidos,
          email: member.email,
          estado_pago: match.pago_realizado ? "pagado" : "pendiente",
          estado_emision: match.estado,
          payment_url: `/api/certificados/pago?codigo=${encodeURIComponent(match.codigo_certificado)}`,
        });
      }
    }

    // Create certificate with REAL column names and retain the attempt reference for payment reconciliation
    const code = `SDO-${new Date().getFullYear()}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
    const totalPreguntas = attempts[0].total_preguntas || TOTAL_QUESTIONS;
    
    const insert = await supabaseFetch(`${url}/rest/v1/certificados`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({
        afiliado_id: member.id,
        curso_id: cursoId,
        intento_id: intentoId,
        nombre: nombreCompleto,
        email: member.email,
        numero_afiliado: member.numero_afiliado,
        codigo_certificado: code,
        puntuacion: attempts[0].puntuacion,
        total_preguntas: totalPreguntas,
        aprobado: true,
        pago_realizado: false,
        importe_pago: 4.99,
        estado: "pendiente",
      }),
      cache: "no-store",
    });
    
    if (!insert.ok) {
      const detail = await insert.text();
      console.error("Certificate creation error:", detail, { 
        afiliado_id: member.id,
        curso_id: cursoId,
        intento_id: intentoId,
      });
      return NextResponse.json({ error: "Error al crear certificado: " + detail }, { status: 502 });
    }

    const insertedData = await insert.json() as Array<{ codigo_certificado: string }>;
    const createdCode = insertedData[0]?.codigo_certificado || code;

    // Return normalized response (codigo/estado_pago/estado_emision for frontend compatibility)
    return NextResponse.json({
      ok: true,
      codigo: createdCode,
      numero_afiliado: member.numero_afiliado,
      nombre: member.nombre,
      apellidos: member.apellidos,
      email: member.email,
      estado_pago: "pendiente",
      estado_emision: "pendiente",
      payment_url: `/api/certificados/pago?codigo=${encodeURIComponent(createdCode)}`,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return NextResponse.json({ error: "La base de datos tardó demasiado en responder. Inténtalo de nuevo." }, { status: 504 });
    console.error("Certificate start error:", error);
    return NextResponse.json({ error: "Error del servidor: " + (error instanceof Error ? error.message : "desconocido") }, { status: 500 });
  }
}
