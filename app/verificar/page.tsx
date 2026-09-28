import Link from "next/link";
import { getCourse } from "@/lib/courses";

type Props = {
  searchParams: Promise<{
    afiliado?: string;
    codigo?: string;
    nombre?: string;
    curso?: string;
    resultado?: string;
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
  codigo: string;
  curso_id: string;
  puntuacion: number;
  total: number;
  estado_pago: string;
  estado_emision: string;
  emitido_at: string | null;
};

async function findAffiliate(numero: string): Promise<Affiliate | null> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = rawKey?.trim();
  if (!url || !key || !/^\d+$/.test(numero)) return null;

  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;

  const response = await fetch(
    `${url.replace(/\/$/, "")}/rest/v1/afiliados?select=id,numero_afiliado,nombre,apellidos,email,activo&numero_afiliado=eq.${encodeURIComponent(numero)}&limit=1`,
    { headers, cache: "no-store" }
  );
  if (!response.ok) return null;
  const rows = (await response.json()) as Affiliate[];
  return rows[0] ?? null;
}

async function findCertificates(affiliateId: string): Promise<Certificate[]> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = rawKey?.trim();
  if (!url || !key) return [];

  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;

  const response = await fetch(
    `${url.replace(/\/$/, "")}/rest/v1/certificados?select=codigo,curso_id,puntuacion,total,estado_pago,estado_emision,emitido_at&afiliado_id=eq.${encodeURIComponent(affiliateId)}&estado_emision=eq.emitido&estado_pago=eq.pagado&order=emitido_at.desc`,
    { headers, cache: "no-store" }
  );
  if (!response.ok) return [];
  return (await response.json()) as Certificate[];
}

export default async function VerificationPage({ searchParams }: Props) {
  const params = await searchParams;
  const afiliado = params.afiliado ?? "";
  const certificateCode = params.codigo ?? "";
  const member = afiliado ? await findAffiliate(afiliado) : null;
  const certificates = member ? await findCertificates(member.id) : [];

  const verifiedMember = member?.activo ? member : null;
  const certificateMatch = certificateCode ? certificates.find((certificate) => certificate.codigo === certificateCode) : null;

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

            {verifiedMember ? (
              <div className="pt-8">
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Afiliación verificada</p>
                  <p className="mt-2 text-4xl font-black text-emerald-700">VÁLIDA ✓</p>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titular</p>
                    <p className="mt-1 text-lg font-black">{verifiedMember.nombre} {verifiedMember.apellidos}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nº de afiliado</p>
                    <p className="mt-1 text-lg font-black">{verifiedMember.numero_afiliado}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-black uppercase">Certificados verificados</h2>
                  {certificates.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {certificates.map((certificate) => {
                        const course = getCourse(certificate.curso_id);
                        return (
                          <div key={certificate.codigo} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-black">{course?.title ?? certificate.curso_id}</p>
                            <p className="mt-1 text-sm text-slate-500">Código: <span className="font-bold text-slate-700">{certificate.codigo}</span></p>
                            <p className="mt-1 text-sm text-slate-500">Resultado: <span className="font-bold text-emerald-700">APTO · {certificate.puntuacion}/{certificate.total}</span></p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No hay certificados emitidos asociados a este número de afiliado.</p>
                  )}
                </div>

                <p className="mt-8 text-xs leading-5 text-slate-500">La información de esta página se consulta directamente en el registro del Sindicato de Operarios. No muestra datos privados como contraseña o información de pago.</p>
              </div>
            ) : certificateMatch ? (
              <div className="pt-8">
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Certificado verificado</p>
                  <p className="mt-2 text-4xl font-black text-emerald-700">VÁLIDO ✓</p>
                </div>
                <div className="mt-7 space-y-4">
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titular</p><p className="mt-1 text-xl font-black">{verifiedMember?.nombre} {verifiedMember?.apellidos}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Formación</p><p className="mt-1 font-bold">{getCourse(certificateMatch.curso_id)?.title ?? certificateMatch.curso_id}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Resultado</p><p className="mt-1 font-black text-emerald-700">APTO · {certificateMatch.puntuacion}/{certificateMatch.total}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Código</p><p className="mt-1 font-black">{certificateMatch.codigo}</p></div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-2xl font-black">Verificación no disponible</p>
                <p className="mt-2 text-sm text-slate-500">Este código no corresponde a un certificado emitido y pagado del Sindicato de Operarios. El resultado del test por sí solo no acredita un certificado.</p>
              </div>
            )}

            <Link href="/" className="mt-8 block rounded-xl bg-slate-950 px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-white">Volver a Sindicato de Operarios</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
