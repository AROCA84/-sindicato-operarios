import { NextResponse } from "next/server";
import { allCourses } from "@/lib/academy-catalog";
import { getExam, PASS_MARK, TOTAL_QUESTIONS } from "@/lib/exam";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; numero_afiliado?: number | string; curso_id?: string; respuestas?: unknown };
    const email = body.email?.trim().toLowerCase();
    const numero = Number(body.numero_afiliado);
    const cursoId = body.curso_id?.trim();
    const answers = Array.isArray(body.respuestas) ? body.respuestas.map(Number) : [];

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId ||
        answers.length !== TOTAL_QUESTIONS || answers.some((a) => !Number.isInteger(a) || a < 0 || a > 3)) {
      return NextResponse.json({ error: "Datos del test no válidos." }, { status: 400 });
    }

    const course = allCourses.find((item) => item.id === cursoId);
    if (!course) return NextResponse.json({ error: "Curso no encontrado." }, { status: 404 });

    const questions = getExam(course);
    if (questions.length !== TOTAL_QUESTIONS) return NextResponse.json({ error: "El examen no está disponible correctamente." }, { status: 500 });

    // Server calculates the score — client cannot forge it
    const puntuacion = answers.reduce((s, a, i) => s + (a === questions[i].answer ? 1 : 0), 0);
    const aprobado = puntuacion >= PASS_MARK;

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    // Look up the afiliado — include nombre and apellidos (required by intentos_test)
    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string; numero_afiliado: number; nombre: string; apellidos: string; email: string }>;
    if (!members.length) return NextResponse.json({ error: "No encontramos una afiliación activa con esos datos." }, { status: 401 });

    const member = members[0];
    const nombreCompleto = `${member.nombre} ${member.apellidos}`.trim();

    // Insert using REAL column names: total_preguntas (not total), nombre, email (NOT NULL)
    const insert = await supabaseFetch(`${url}/rest/v1/intentos_test`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({
        afiliado_id: member.id,
        curso_id: cursoId,
        nombre: nombreCompleto,
        email: member.email,
        puntuacion,
        total_preguntas: TOTAL_QUESTIONS,
        aprobado,
        respuestas: answers,
      }),
      cache: "no-store",
    });
    if (!insert.ok) {
      console.error("Test attempt creation error:", await insert.text());
      return NextResponse.json({ error: "No se pudo guardar el resultado del test." }, { status: 502 });
    }

    const rows = await insert.json() as Array<{ id: string }>;
    if (!rows[0]?.id) return NextResponse.json({ error: "No se recibió el identificador del intento." }, { status: 502 });

    // Return normalized response (total field for frontend compatibility)
    return NextResponse.json({ ok: true, intento_id: rows[0].id, puntuacion, total: TOTAL_QUESTIONS, aprobado });
  } catch (error) {
    console.error("Test submit error:", error);
    return NextResponse.json({ error: "Error del servidor al guardar el test." }, { status: 500 });
  }
}
