import Link from "next/link";
import { getCourse } from "@/lib/courses";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

type Props = {
  searchParams: Promise<{
    afiliado?: string;
    codigo?: string;
  }>;
};

type Affiliate = {
  id: string;
  numero_afiliado: number;
  nombre: string;
  apellidos: string;
  email: string;
  activo: boolean;
};

type Certificate = {
  codigo_certificado: string;
  curso_id: string;
  puntuacion: number;
  total_preguntas: number;
  pago_realizado: boolean;
  estado: string;
  fecha_emision: string | null;
  afiliado_id: string;
};

async function findAffiliate(numero: string) {
  const { url, key } = supabaseConfig();
  if (!url || !key || !/^\d+$/.test(numero)) return null;

  const response = await supabaseFetch(
    `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email,activo&numero_afiliado=eq.${encodeURIComponent(numero)}&activo=eq.true&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!response.ok) return null;
  const rows = await response.json() as Affiliate[];
  return rows[0] ?? null;
}

async function findCertificate(codigo: string) {
  const { url, key } = supabaseConfig();
  if (!url || !key || !/^SDO-[A-Z0-9-]+$/i.test(codigo)) return null;

  // Query by REAL column: codigo_certificado
  const response = await supabaseFetch(
    `${url}/rest/v1/certificados?select=codigo_certificado,curso_id,puntuacion,total_preguntas,pago_realizado,estado,fecha_emision,afiliado_id&codigo_certificado=eq.${encodeURIComponent(codigo)}&pago_realizado=eq.true&estado=eq.emitido&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!response.ok) return null;
  const rows = await response.json() as Certificate[];
  return rows[0] ?? null;
}

async function findAffiliateById(id: string) {
  const { url, key } = supabaseConfig();
  if (!url || !key) return null;

  const response = await supabaseFetch(
    `${url}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email,activo&id=eq.${encodeURIComponent(id)}&activo=eq.true&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!response.ok) return null;
  const rows = await response.json() as Affiliate[];
  return rows[0] ?? null;
}

export default async function VerificationPage({ searchParams }: Props) {
  const params = await searchParams;
  const afiliadoNumero = params.afiliado ?? "";
  const codigo = params.codigo ?? "";

  const member = afiliadoNumero ? await findAffiliate(afiliadoNumero) : null;
  const certificate = codigo ? await findCertificate(codigo) : null;

  const certificateOwner =
    certificate && !member
      ? await findAffiliateById(certificate.afiliado_id)
      : member;

  const validAffiliate = Boolean(member?.activo);
  const validCertificate = Boolean(certificate && certificateOwner?.activo);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
          <div className="h-2 bg-safety" />
          <div className="p-7 sm:p-10">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-safety">SO</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verificación digital</p>
                <h1 className="text-xl font-black uppercase">Sindicato de Operarios</h1>
              </div>
            </div>

            {validCertificate && certificate && certificateOwner ? (
              <section className="pt-8">
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Certificado verificado</p>
                  <p className="mt-2 text-4xl font-black text-emerald-700">VÁLIDO ✓</p>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titular</p><p className="mt-1 text-lg font-black">{certificateOwner.nombre} {certificateOwner.apellidos}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nº de afiliado</p><p className="mt-1 text-lg font-black">{certificateOwner.numero_afiliado}</p></div>
                </div>
                <div className="mt-7 space-y-4">
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Formación</p><p className="mt-1 font-bold">{getCourse(certificate.curso_id)?.title ?? certificate.curso_id}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Resultado</p><p className="mt-1 font-black text-emerald-700">APTO · {certificate.puntuacion}/{certificate.total_preguntas}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Código de verificación</p><p className="mt-1 font-black">{certificate.codigo_certificado}</p></div>
                </div>
              </section>
            ) : validAffiliate && member ? (
              <section className="pt-8">
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Afiliación verificada</p>
                  <p className="mt-2 text-4xl font-black text-emerald-700">VÁLIDA ✓</p>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titular</p><p className="mt-1 text-lg font-black">{member.nombre} {member.apellidos}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nº de afiliado</p><p className="mt-1 text-lg font-black">{member.numero_afiliado}</p></div>
                </div>
                <p className="mt-7 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Este QR verifica la afiliación activa. Los certificados se verifican mediante su código de certificado.</p>
              </section>
            ) : (
              <section className="py-12 text-center">
                <p className="text-2xl font-black">Verificación no disponible</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">Este código no corresponde a una afiliación activa o a un certificado pagado y emitido del Sindicato de Operarios.</p>
              </section>
            )}

            <Link href="/" className="mt-8 block rounded-xl bg-slate-950 px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-white">Volver a Sindicato de Operarios</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
