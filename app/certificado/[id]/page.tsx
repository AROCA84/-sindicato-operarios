import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import { CertificatePreview } from "@/components/certificate-preview";

type CertificatePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ score?: string; total?: string }>;
};

export default async function CertificatePage({ params, searchParams }: CertificatePageProps) {
  const { id } = await params;
  const { score, total } = await searchParams;
  const course = getCourse(id);
  if (!course) notFound();

  const scoreNumber = Number(score ?? 0);
  const totalNumber = Number(total ?? 20);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10">
        <Link href={"/cursos/" + course.id} className="mb-8 text-sm font-semibold text-slate-400 transition hover:text-white">
          ← Volver al curso
        </Link>

        <section className="mb-8 rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl sm:p-10">
          <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">✓ TEST APROBADO</div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">¡Eres apto! Enhorabuena</h1>
          <p className="mt-3 text-lg text-slate-300">Has superado el test final de:</p>
          <h2 className="mt-2 text-xl font-bold text-white">{course.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resultado</p>
              <p className="mt-2 text-4xl font-black text-emerald-400">{scoreNumber}/{totalNumber}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Test</p>
              <p className="mt-2 text-2xl font-black text-white">GRATUITO</p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-5 text-center">
            <p className="text-sm font-black leading-6 text-orange-200 sm:text-base">
              ESTUDIAR Y HACER EL TEST ES GRATIS. SOLO PAGAS AL FINAL SI QUIERES OBTENER TU CERTIFICADO.
            </p>
          </div>
        </section>

        <CertificatePreview
          courseId={course.id}
          courseTitle={course.title}
          score={scoreNumber}
          total={totalNumber}
        />
      </div>
    </main>
  );
}
