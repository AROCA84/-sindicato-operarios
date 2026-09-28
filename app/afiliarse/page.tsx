"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AfiliarsePage() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [numeroAfiliado, setNumeroAfiliado] = useState<number | null>(null);

  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/afiliarse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellidos, email, telefono }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se ha podido completar la afiliación.");
      }

      window.localStorage.setItem("sdo-afiliado", "true");
      window.localStorage.setItem("sdo-afiliacion-fecha", new Date().toISOString());
      window.localStorage.setItem("sdo-numero-afiliado", String(data.numero_afiliado));
      window.localStorage.setItem("sdo-afiliado-nombre", data.nombre);
      window.localStorage.setItem("sdo-afiliado-apellidos", data.apellidos);
      window.localStorage.setItem("sdo-afiliado-email", data.email);

      setNumeroAfiliado(data.numero_afiliado);

      setTimeout(() => {
        window.location.href = returnTo.startsWith("/") ? returnTo : "/";
      }, 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se ha podido completar la afiliación.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <a href={returnTo.startsWith("/") ? returnTo : "/"} className="font-bold text-safety">
          ← Volver
        </a>

        <div className="mt-8 rounded-2xl bg-white p-8 text-navy shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-safety bg-navy text-xl font-black text-safety">
            SO
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-safety-dark">
            Afiliación gratuita
          </p>
          <h1 className="mt-3 text-3xl font-black">Afíliate al Sindicato de Operarios</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Únete gratis y de por vida para acceder a nuestros cursos y temarios de formación.
            Estudiar y realizar los test es gratis.
          </p>

          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <p>✓ Afiliación gratuita</p>
            <p>✓ Acceso a formación desde 0 €</p>
            <p>✓ Temarios y test gratuitos</p>
            <p>✓ Número de afiliado generado automáticamente</p>
            <p>✓ Solo pagas 4,99 € si, después de aprobar, quieres tu certificado</p>
          </div>

          {numeroAfiliado ? (
            <div className="mt-8 rounded-2xl border-2 border-safety bg-safety/10 p-6 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-600">
                Afiliación completada
              </p>
              <p className="mt-2 text-4xl font-black text-navy">
                Nº {numeroAfiliado}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Redirigiendo a tu contenido…
              </p>
            </div>
          ) : (
            <form onSubmit={join} className="mt-8 space-y-4">
              <div>
                <label htmlFor="nombre" className="text-sm font-bold text-navy">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy outline-none focus:border-safety focus:ring-2 focus:ring-safety/30"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="apellidos" className="text-sm font-bold text-navy">
                  Apellidos *
                </label>
                <input
                  id="apellidos"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy outline-none focus:border-safety focus:ring-2 focus:ring-safety/30"
                  placeholder="Tus apellidos"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-bold text-navy">
                  Correo electrónico *
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy outline-none focus:border-safety focus:ring-2 focus:ring-safety/30"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="text-sm font-bold text-navy">
                  Teléfono <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy outline-none focus:border-safety focus:ring-2 focus:ring-safety/30"
                  placeholder="600 000 000"
                />
              </div>

              {error && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="block w-full rounded-xl bg-safety px-6 py-4 text-center font-black text-navy shadow-lg transition hover:bg-safety-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creando tu afiliación…" : "Afiliarme gratis y continuar"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                No se cobra nada por afiliarte, estudiar ni realizar el test.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
