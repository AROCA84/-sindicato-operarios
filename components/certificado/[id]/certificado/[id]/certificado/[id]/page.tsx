certificado/[id]/page.tsximport Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";

type CertificatePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    score?: string;
    total?: string;
  }>;
};

export default async function CertificatePage({
  params,
  searchParams,
}: CertificatePageProps) {
  const { id } = await params;
  const { score, total } = await searchParams;

  const course = getCourse(id);

  if (!course) {
    notFound();
  }

  const scoreNumber = Number(score ?? 0);
  const totalNumber = Number(total ?? 20);

  const whatsappMessage = encodeURIComponent(
    `Hola, he aprobado el test del curso "${course.title}" y quiero solicitar mi certificado por 4,99 €. Mi resultado ha sido ${scoreNumber}/${totalNumber}.`
  );

  const whatsappUrl = `https://wa.me/34642077425?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10">
        <Link
          href={`/cursos/${course.id}`}
          className="mb-8 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          ← Volver al curso
        </Link>

        <section className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl sm:p-10">
          <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            ✓ TEST APROBADO
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            ¡Has aprobado!
          </h1>

          <p className="mt-3 text-lg text-slate-300">
            Has superado el test final del curso:
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            {course.title}
          </h2>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/70 p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Resultado
            </p>

            <p className="mt-2 text-5xl font-black text-emerald-400">
              {scoreNumber}/{totalNumber}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Test realizado gratuitamente
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-6">
            <p className="text-center text-sm font-black leading-6 text-orange-200 sm:text-base">
              ESTUDIAR Y HACER EL TEST ES GRATIS. SOLO PAGAS AL FINAL SI
              QUIERES OBTENER TU CERTIFICADO.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Certificado
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              4,99 €
            </p>

            <p className="mt-2 text-slate-300">
              El pago solo se solicita después de aprobar. Una vez confirmado
              el pago, se habilitará la descarga de tu certificado.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-center text-base font-black text-slate-950 transition hover:bg-emerald-400"
          >
            Solicitar certificado por 4,99 € →
          </a>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Se abrirá WhatsApp para solicitar el certificado y recibir las
            instrucciones de pago.
          </p>
        </section>
      </div>
    </main>
  );
}
