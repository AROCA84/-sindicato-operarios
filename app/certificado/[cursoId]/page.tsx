import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CertificatePreview } from "@/components/certificate-preview";
import { getAcademyCourse } from "@/lib/academy-catalog";

export default async function CertificatePage({
  params,
  searchParams,
}: {
  params: Promise<{ cursoId: string }>;
  searchParams: Promise<{ score?: string; total?: string; intento_id?: string }>;
}) {
  const { cursoId } = await params;
  const query = await searchParams;
  const course = getAcademyCourse(cursoId);
  if (!course) notFound();

  const score = Number(query.score ?? 0);
  const total = Number(query.total ?? 20);
  const safeScore = Number.isFinite(score) && score >= 0 ? score : 0;
  const safeTotal = Number.isFinite(total) && total > 0 ? total : 20;
  const attemptId = query.intento_id?.trim() ?? "";

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-navy px-4 py-10 text-white sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">Sindicato de Operarios</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Tu certificado</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              La formación y la evaluación son gratuitas. La certificación es opcional y solo se emite después de confirmar el pago.
            </p>
          </div>
          <Suspense fallback={<div className="rounded-2xl bg-slate-900 p-6 text-slate-300">Cargando certificado…</div>}>
            <CertificatePreview
              courseId={course.id}
              courseTitle={course.title}
              score={safeScore}
              total={safeTotal}
              attemptId={attemptId}
            />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
