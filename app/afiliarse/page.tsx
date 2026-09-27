"use client";

export default function AfiliarsePage() {
  return (
    <main className="min-h-screen bg-navy px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <a href="/" className="text-safety font-bold">← Volver al inicio</a>

        <div className="mt-12 rounded-2xl bg-white p-8 text-navy">
          <p className="text-sm font-bold uppercase tracking-widest text-safety-dark">
            Afiliación gratuita
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Afíliate al Sindicato de Operarios
          </h1>

          <p className="mt-4 text-slate-600">
            La afiliación es gratuita y te permite acceder a la formación a 0 €.
          </p>

          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem("sdo-afiliado", "true");
              window.location.href = "/";
            }}
            className="mt-8 block w-full rounded-lg bg-safety px-6 py-4 text-center font-black text-navy"
          >
            Afiliarme gratis y acceder a los cursos
          </button>
        </div>
      </div>
    </main>
  );
}
