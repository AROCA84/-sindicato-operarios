"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CertificatePreview } from "@/components/certificate-preview";

const COURSE_ID = "carretillas-elevadoras";
const COURSE_TITLE = "Operario de Carretillas Elevadoras, Frontales y Retráctiles";

export default function PruebaCertificacionPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.search !== "?prueba=1") {
      router.replace("/prueba-certificacion?prueba=1");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-2xl border border-safety/30 bg-safety/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">ENTORNO DE PRUEBA</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Certificado y carné sin pago</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Esta pantalla simula que el certificado ya ha sido pagado. No realiza ningún cargo
            y no modifica el estado real de ningún certificado.
          </p>
        </div>

        <Suspense
          fallback={
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
              Preparando la previsualización del certificado…
            </section>
          }
        >
          <CertificatePreview
            courseId={COURSE_ID}
            courseTitle={COURSE_TITLE}
            score={18}
            total={20}
            attemptId="PRUEBA-CERTIFICACION"
          />
        </Suspense>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Carné de aptitud</p>
          <h2 className="mt-2 text-xl font-black">Probar también el carné PVC</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Abre la vista preparada para previsualizar y descargar el carné horizontal y el certificado A4.
          </p>
          <Link
            href="/admin/certificados"
            className="mt-5 block rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400"
          >
            VER CERTIFICADO Y CARNÉ
          </Link>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          Ruta de comprobación visual. No representa un pago real.
        </p>
      </div>
    </main>
  );
}
