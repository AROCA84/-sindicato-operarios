import { NextResponse } from "next/server";
import { allCourses } from "@/lib/academy-catalog";
import { getExam, PASS_MARK, reviewAnswers, TOTAL_QUESTIONS } from "@/lib/exam";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();
    const numero = Number(searchParams.get("numero_afiliado"));
    const cursoId = searchParams.get("curso_id")?.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(numero) || !cursoId) {
      return NextResponse.json({ error: "Datos de consulta no válidos." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    if (!url || !key) return NextResponse.json({ error: "La base de datos no está configurada." }, { status: 503 });
    const h = headers(key);

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=id&numero_afiliado=eq.${numero}&email=eq.${encodeURIComponent(email)}&activo=eq.true&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return NextResponse.json({ error: "No se pudo comprobar la afiliación." }, { status: 502 });
    const members = await memberResponse.json() as Array<{ id: string }>;
    if (!members.length) return NextResponse.json({ found: false });

    // Query using REAL columns: total_preguntas (not total), fecha_intento (not realizado_at)
    const attemptsResponse = await supabaseFetch(
      `${url}/rest/v1/intentos_test?select=id,curso_id,puntuacion,aprobado,respuestas,total_preguntas&afiliado_id=eq.${encodeURIComponent(members[0].id)}&curso_id=eq.${encodeURIComponent(cursoId)}&aprobado=eq.true&puntuacion=gte.${PASS_MARK}&order=fecha_intento.desc&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!attemptsResponse.ok) return NextResponse.json({ error: "No se pudo consultar el resultado del test." }, { status: 502 });

    const attempts = await attemptsResponse.json() as Array<{
      id: string;
      curso_id: string;
      puntuacion: number;
      aprobado: boolean;
      respuestas?: unknown;
      total_preguntas: number;
    }>;
    const attempt = attempts[0];

    if (
      !attempt ||
      !attempt.aprobado ||
      typeof attempt.puntuacion !== "number" ||
      attempt.puntuacion < PASS_MARK
    ) {
      return NextResponse.json({ found: false });
    }

    const answerList = Array.isArray(attempt.respuestas) ? attempt.respuestas.map(Number) : null;
    const hasAnswers = answerList !== null && answerList.length === TOTAL_QUESTIONS;
    const course = allCourses.find((item) => item.id === cursoId);
    const questions = course ? getExam(course) : null;
    const review = questions && hasAnswers ? reviewAnswers(questions, answerList) : null;

    // Return normalized response (total field for frontend compatibility)
    return NextResponse.json({
      found: true,
      intento_id: attempt.id,
      puntuacion: attempt.puntuacion,
      total: attempt.total_preguntas || TOTAL_QUESTIONS,
      aprobado: true,
      respuestas: hasAnswers ? answerList : null,
      aciertos: review?.aciertos ?? null,
      correctas: questions ? questions.map((question) => question.answer) : null,
    });
  } catch (error) {
    console.error("Test result lookup error:", error);
    return NextResponse.json({ error: "Error del servidor al consultar el resultado." }, { status: 500 });
  }
}
