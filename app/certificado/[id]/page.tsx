import Link from "next/link";
import { notFound } from "next/navigation";
import { allCourses } from "@/lib/academy-catalog";
import { PASS_MARK, PASS_PERCENT, TOTAL_QUESTIONS } from "@/lib/exam";
import { internalPreviewEnabled } from "@/lib/internal-preview";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";
import { CertificatePreview } from "@/components/certificate-preview";

type CertificatePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ score?: string; total?: string; intento?: string; codigo?: string; pago?: string; prueba?: string }>;
};

/**
 * Validate server-side that the user has a real approved attempt.
 * The client cannot forge the score, total, or approved status.
 */
async function validateAttempt(intentoId: string, courseId: string) {
  const { url, key } = supabaseConfig();
  if (!url || !key) return null;

  const response = await supabaseFetch(
    `${url}/rest/v1/intentos_test?select=id,curso_id,puntuacion,aprobado,total_preguntas&id=eq.${encodeURIComponent(intentoId)}&limit=1`,
    { headers: headers(key), cache: "no-store" }
  );
  if (!response.ok) return null;
  const rows = await response.json() as Array<{
    id: string; curso_id: string; puntuacion: number; aprobado: boolean; total_preguntas: number;
  }>;
  const attempt = rows[0];
  if (!attempt || !attempt.aprobado || attempt.puntuacion < PASS_MARK || attempt.curso_id !== courseId) {
    return null;
  }
  return {
    puntuacion: attempt.puntuacion,
    total: attempt.total_preguntas || TOTAL_QUESTIONS,
  };
}

/**
 * Validate server-side that the certificate is paid and emitted.
 */
async function validateCertificate(codigo: string) {
  const { url, key } = supabaseConfig();
  if (!url || !key) return null;

  const response = await supabaseFetch(
    `${url}/rest/v1/certificados?select=codigo_certificado,curso_id,puntuacion,total_preguntas,pago_realizado,estado&codigo_certificado=eq.${encodeURIComponent(codigo)}&limit=1`,
    { headers: headers(key), cache: "no-store" }
  );
  if (!response.ok) return null;
  const rows = await response.json() as Array<{
    codigo_certificado: string; curso_id: string; puntuacion: number; total_preguntas: number;
    pago_realizado: boolean; estado: string;
  }>;
  const cert = rows[0];
  if (!cert) return null;
  return {
    puntuacion: cert.puntuacion,
    total: cert.total_preguntas || TOTAL_QUESTIONS,
    paid: cert.pago_realizado,
    estado: cert.estado,
    curso_id: cert.curso_id,
  };
}

export default async function CertificatePage({ params, searchParams }: CertificatePageProps) {
  const { id } = await params;
  const { score, total, intento, codigo, pago, prueba } = await searchParams;
  const course = allCourses.find((item) => item.id === id);
  if (!course) notFound();

  // Server-side validation: don't trust client-provided score/total
  let validatedScore = 0;
  let validatedTotal = TOTAL_QUESTIONS;
  let passed = false;

  const internalTest = prueba === "1" && internalPreviewEnabled();

  if (internalTest) {
    // Ruta interna de pruebas: no crea certificados reales ni procesa pagos.
    validatedScore = TOTAL_QUESTIONS;
    validatedTotal = TOTAL_QUESTIONS;
    passed = true;
  } else if (intento?.trim()) {
    // User comes from the test result — validate the attempt is real and approved
    const attempt = await validateAttempt(intento.trim(), course.id);
    if (attempt) {
      validatedScore = attempt.puntuacion;
      validatedTotal = attempt.total;
      passed = true;
    }
  } else if (codigo?.trim() && pago === "ok") {
    // User returns from myPOS. The server-to-server notification can arrive
    // a few seconds after the browser redirect, so do NOT require payment to
    // already be confirmed here. The client will poll /api/certificados/estado
    // and only reveal/download the certificate after pago_realizado=true and
    // estado="emitido".
    const cert = await validateCertificate(codigo.trim());
    if (cert && cert.curso_id === course.id) {
      validatedScore = cert.puntuacion;
      validatedTotal = cert.total;
      passed = true;
    }
  }

  // Ignore client-provided score/total — only use server-validated values
  void score; void total;

  if (!passed) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-10">
          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">!</div>
            <h1 className="mt-5 text-2xl font-black">Certificado no disponible todavía</h1>
            <p className="mt-3 text-slate-300">Debes superar el test con al menos <strong className="text-white">{PASS_MARK} de {TOTAL_QUESTIONS} respuestas correctas ({PASS_PERCENT} %)</strong> y acceder desde el resultado oficial del intento.</p>
            <Link href={`/cursos/${course.id}/test`} className="mt-6 inline-flex rounded-xl bg-safety px-6 py-3 text-sm font-black uppercase tracking-wide text-navy">Ir al test</Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10">
        <Link href={`/cursos/${course.id}`} className="mb-8 text-sm font-semibold text-slate-400 transition hover:text-white">← Volver al curso</Link>
        <section className="mb-8 rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl sm:p-10">
          <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">✓ TEST APROBADO</div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">¡Eres apto! Enhorabuena</h1>
          <p className="mt-3 text-lg text-slate-300">Has superado el test final de:</p>
          <h2 className="mt-2 text-xl font-bold text-white">{course.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resultado</p><p className="mt-2 text-4xl font-black text-emerald-400">{validatedScore}/{validatedTotal}</p></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Test</p><p className="mt-2 text-2xl font-black text-white">GRATUITO</p></div>
          </div>
        </section>
        <CertificatePreview courseId={course.id} courseTitle={course.title} score={validatedScore} total={validatedTotal} attemptId={intento || codigo || ""} internalTest={internalTest} />
      </div>
    </main>
  );
}
