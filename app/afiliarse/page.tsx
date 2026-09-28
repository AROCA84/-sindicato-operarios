"use client";

import { useSearchParams } from "next/navigation";

export default function AfiliarsePage() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  function join() {
    window.localStorage.setItem("sdo-afiliado", "true");
    window.localStorage.setItem("sdo-afiliacion-fecha", new Date().toISOString());
    window.location.href = returnTo.startsWith("/") ? returnTo : "/";
  }

  return (
    <main className="min-h-screen bg-navy px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <a href={returnTo.startsWith("/") ? returnTo : "/"} className="text-safety font-bold">← Volver</a>
        <div className="mt-12 rounded-2xl bg-white p-8 text-navy shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-safety bg-navy text-xl font-black text-safety">SO</div>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-safety-dark">Afiliación gratuita</p>
          <h1 className="mt-3 text-3xl font-black">Afíliate al Sindicato de Operarios</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Únete gratis y de por vida para acceder a nuestros cursos y temarios de formación. Estudiar y realizar los test es gratis.
          </p>
          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <p>✓ Afiliación gratuita</p>
            <p>✓ Acceso a formación desde 0 €</p>
            <p>✓ Temarios y test gratuitos</p>
            <p>✓ Solo pagas 4,99 € si, después de aprobar, quieres tu certificado</p>
          </div>
          <button type="button" onClick={join} className="mt-8 block w-full rounded-xl bg-safety px-6 py-4 text-center font-black text-navy shadow-lg transition hover:bg-safety-dark">
            Afiliarme gratis y continuar
          </button>
        </div>
      </div>
    </main>
  );
}
