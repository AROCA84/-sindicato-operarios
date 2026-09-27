import Link from "next/link";

type Props = {
  searchParams: Promise<{
    codigo?: string;
    nombre?: string;
    curso?: string;
    resultado?: string;
  }>;
};

export default async function VerificationPage({ searchParams }: Props) {
  const params = await searchParams;
  const codigo = params.codigo ?? "";
  const nombre = params.nombre ?? "";
  const curso = params.curso ?? "";
  const resultado = params.resultado ?? "";

  const valid = Boolean(codigo && nombre && curso && resultado === "APTO");

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
          <div className="h-2 bg-safety" />
          <div className="p-7 sm:p-10">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-safety">
                SO
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Verificación digital
                </p>
                <h1 className="text-xl font-black uppercase">Sindicato de Operarios</h1>
              </div>
            </div>

            {valid ? (
              <div className="pt-8">
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                    Resultado registrado en el documento
                  </p>
                  <p className="mt-2 text-4xl font-black text-emerald-700">APTO ✓</p>
                </div>

                <div className="mt-7 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titular</p>
                    <p className="mt-1 text-xl font-black">{nombre}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Formación</p>
                    <p className="mt-1 font-bold">{curso}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nº de afiliado</p>
                    <p className="mt-1 font-black">{codigo}</p>
                  </div>
                </div>

                <p className="mt-8 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                  Esta página muestra los datos incluidos en el código QR del documento.
                  La validación oficial de identidad y expedición requiere el sistema de
                  registro correspondiente del Sindicato de Operarios.
                </p>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-2xl font-black">Código no válido</p>
                <p className="mt-2 text-sm text-slate-500">
                  El QR no contiene los datos necesarios para mostrar esta tarjeta.
                </p>
              </div>
            )}

            <Link
              href="/"
              className="mt-8 block rounded-xl bg-slate-950 px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-white"
            >
              Volver a Sindicato de Operarios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
