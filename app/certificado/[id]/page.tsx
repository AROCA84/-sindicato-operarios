import Link from "next/link";
import { notFound } from "next/navigation";
import { allCourses } from "@/lib/academy-catalog";
import { CertificatePreview } from "@/components/certificate-preview";

type CertificatePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ score?: string; total?: string; intento?: string }>;
};

export default async function CertificatePage({ params, searchParams }: CertificatePageProps) {
  const { id } = await params;
  const { score, total, intento } = await searchParams;
  const course = allCourses.find((item) => item.id === id);
  if (!course) notFound();

  const scoreNumber = Number(score ?? 0);
  const totalNumber = Number(total ?? 20);
  const passed = totalNumber === 20 && scoreNumber >= 14 && Boolean(intento?.trim());

  if (!passed) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-10">
          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">!</div>
            <h1 className="mt-5 text-2xl font-black">Certificado no disponible todavía</h1>
            <p className="mt-3 text-slate-300">Debes superar el test con al menos <strong className="text-white">14 de 20 respuestas correctas (70 %)</strong> y acceder desde el resultado oficial del intento.</p>
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
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resultado</p><p className="mt-2 text-4xl font-black text-emerald-400">{scoreNumber}/{totalNumber}</p></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Test</p><p className="mt-2 text-2xl font-black text-white">GRATUITO</p></div>
          </div>
        </section>
        <CertificatePreview courseId={course.id} courseTitle={course.title} score={scoreNumber} total={totalNumber} attemptId={intento!} />
      </div>
    </main>
  );
}
