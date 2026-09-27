"use client";

import { useState } from "react";
import { CheckCircle2, Eye, QrCode, ShieldCheck } from "lucide-react";

const courseTitle = "Operario de Carretillas Elevadoras, Frontales y Retráctiles";

function InstitutionalMark({ label }: { label: string }) {
  return (
    <div className="flex h-10 min-w-[92px] items-center justify-center rounded border border-slate-300 bg-white/80 px-2 text-center text-[7px] font-black uppercase leading-tight tracking-wide text-slate-500">
      {label}
    </div>
  );
}

export default function AdminCertificadosPage() {
  const [studentName, setStudentName] = useState("Nombre y Apellidos");

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-safety/20 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">Administración</p>
            <h1 className="mt-2 text-3xl font-black">Vista previa de certificados</h1>
            <p className="mt-2 text-sm text-slate-300">Revisa el diseño horizontal del carné y del certificado.</p>
          </div>
          <a href="/" className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold hover:bg-white/10">
            ← Volver a la web
          </a>
        </div>

        <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <label className="block text-sm font-bold">
            Nombre de prueba
            <input
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety"
            />
          </label>
        </section>

        <div className="space-y-10">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-safety" />
              <h2 className="text-xl font-black">Carné / Tarjeta de aptitud · Horizontal</h2>
            </div>

            <div
              className="relative mx-auto aspect-[1.586/1] max-w-4xl overflow-hidden rounded-2xl border border-safety/40 bg-slate-950 p-5 text-white shadow-2xl sm:p-7"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, rgba(250,180,35,.18) 0 2px, transparent 3px), linear-gradient(135deg, transparent 0 45%, rgba(255,255,255,.035) 45% 46%, transparent 46% 100%), repeating-linear-gradient(25deg, rgba(255,255,255,.025) 0 1px, transparent 1px 9px)",
              }}
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-safety/20" />
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-safety/10" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-white/40 bg-white/10 text-center text-[9px] font-black uppercase text-slate-300">
                      Foto
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-safety font-black text-navy">SO</div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-safety">Sindicato de Operarios</p>
                          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Formación profesional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-safety/40 bg-safety/10 px-3 py-2 text-right">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-safety">Estado</span>
                    <span className="text-lg font-black">APTO ✓</span>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-5">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">Titular</p>
                    <p className="mt-1 text-2xl font-black uppercase">{studentName || "Nombre y Apellidos"}</p>
                    <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">Formación acreditada</p>
                    <p className="mt-1 max-w-xl text-sm font-bold leading-5 text-slate-100">{courseTitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold">Nº AFILIACIÓN · SO-1000</span>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold">RESULTADO · 18/20</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-2 text-slate-950 shadow-xl">
                    <QrCode className="h-20 w-20" />
                    <p className="mt-1 text-center text-[7px] font-black uppercase">Verificación</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-safety" />
              <h2 className="text-xl font-black">Certificado de aptitud · Horizontal</h2>
            </div>

            <div
              className="relative mx-auto aspect-[1.414/1] max-w-5xl overflow-hidden rounded-xl border-4 border-[#9a7418] bg-[#d5b45a] p-3 text-slate-900 shadow-2xl sm:p-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 10% 20%, rgba(255,255,255,.22) 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, rgba(80,55,10,.08) 0 1px, transparent 2px), repeating-linear-gradient(45deg, rgba(120,90,20,.055) 0 2px, transparent 2px 12px)",
              }}
            >
              <div className="relative h-full rounded-lg border-2 border-[#8a6615] bg-[#ead17d]/55 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b-2 border-[#8a6615]/60 pb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-safety">SO</div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.2em]">Sindicato de Operarios</p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">Certificación de aptitudes profesionales</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <InstitutionalMark label="Espacio para logo institucional" />
                    <InstitutionalMark label="Espacio para sello / entidad" />
                  </div>
                </div>

                <div className="flex h-[calc(100%-72px)] flex-col items-center justify-center text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-600">Se certifica que</p>
                  <h3 className="mt-2 text-3xl font-black uppercase tracking-wide sm:text-4xl">{studentName || "Nombre y Apellidos"}</h3>
                  <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-[#8a6615]" />
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">ha superado satisfactoriamente la formación correspondiente a:</p>
                  <p className="mt-2 max-w-3xl text-xl font-black sm:text-2xl">{courseTitle}</p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-1 text-[9px] font-black uppercase">APTO · 18/20</span>
                    <span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-1 text-[9px] font-black uppercase">SDO-2026-0001</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between border-t border-[#8a6615]/50 pt-2 sm:bottom-6 sm:left-6 sm:right-6">
                  <div>
                    <p className="font-serif text-lg">Sindicato de Operarios</p>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">Dirección de Formación</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <QrCode className="h-12 w-12" />
                      <p className="text-[7px] font-black uppercase">Verificación</p>
                    </div>
                    <CheckCircle2 className="h-9 w-9 text-[#6f5410]" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-safety/20 bg-safety/10 p-5 text-sm text-slate-200">
          <strong className="text-white">Nota:</strong> los recuadros institucionales son espacios reservados para logotipos oficiales únicamente cuando exista autorización para utilizarlos. Los datos, número y QR mostrados son de ejemplo y no representan un certificado válido.
        </div>
      </div>
    </main>
  );
}
