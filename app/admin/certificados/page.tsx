"use client";

import { useState } from "react";
import { CheckCircle2, Eye, QrCode, ShieldCheck } from "lucide-react";

const courseTitle = "Operario de Carretillas Elevadoras, Frontales y Retráctiles";

export default function AdminCertificadosPage() {
  const [studentName, setStudentName] = useState("Nombre y Apellidos");

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-safety/20 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">Administración</p>
            <h1 className="mt-2 text-3xl font-black">Vista previa de certificados</h1>
            <p className="mt-2 text-sm text-slate-300">
              Revisa el diseño del carné y del certificado antes de publicarlo.
            </p>
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

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-safety" />
              <h2 className="text-xl font-black">Carné / Tarjeta de aptitud</h2>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white p-5 text-slate-900 shadow-2xl ring-4 ring-slate-200 sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">SINDICATO DE OPERARIOS</p>
                  <h3 className="mt-2 text-2xl font-black uppercase">Tarjeta de aptitud</h3>
                </div>
                <div className="rounded-xl bg-slate-900 px-3 py-2 text-center text-white">
                  <span className="block text-[9px] font-black uppercase">Apto</span>
                  <CheckCircle2 className="mx-auto mt-1 h-5 w-5 text-safety" />
                </div>
              </div>

              <div className="grid gap-6 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Alumno</p>
                  <p className="mt-1 text-2xl font-black">{studentName || "Nombre y Apellidos"}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Formación superada</p>
                  <p className="mt-1 text-lg font-bold">{courseTitle}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="rounded-lg bg-slate-100 px-3 py-2">
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Nº afiliación</span>
                      <span className="font-black">SO-1000</span>
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2">
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Resultado</span>
                      <span className="font-black">18/20 · APTO</span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto rounded-xl border-4 border-slate-900 p-3">
                  <QrCode className="h-32 w-32" />
                </div>
              </div>

              <div className="rounded-xl bg-slate-100 p-4 text-center text-xs font-bold uppercase tracking-wide text-slate-600">
                Apto · Enhorabuena · Certificación de aptitudes
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-safety" />
              <h2 className="text-xl font-black">Certificado de aptitud</h2>
            </div>

            <div className="rounded-3xl bg-white p-5 text-center text-slate-900 shadow-2xl ring-4 ring-slate-200 sm:p-8">
              <div className="border-4 border-slate-900 p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">SINDICATO DE OPERARIOS</p>
                <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-safety" />
                <h3 className="mt-6 text-3xl font-black uppercase tracking-wide">Certificado de aptitud</h3>
                <p className="mt-6 text-sm text-slate-500">Se certifica que</p>
                <p className="mt-2 text-3xl font-black">{studentName || "Nombre y Apellidos"}</p>
                <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-slate-600">
                  ha superado satisfactoriamente la formación correspondiente a:
                </p>
                <p className="mt-3 text-xl font-black">{courseTitle}</p>

                <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3 text-left">
                  <div className="rounded-lg bg-slate-100 p-3">
                    <span className="block text-[10px] font-bold uppercase text-slate-500">Resultado</span>
                    <span className="font-black">APTO · 18/20</span>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-3">
                    <span className="block text-[10px] font-bold uppercase text-slate-500">Nº certificado</span>
                    <span className="font-black">SDO-2026-0001</span>
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between gap-5 border-t border-slate-200 pt-6 text-left">
                  <div>
                    <p className="font-serif text-xl">Sindicato de Operarios</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Dirección de Formación</p>
                  </div>
                  <div className="text-center">
                    <QrCode className="mx-auto h-16 w-16" />
                    <p className="mt-1 text-[9px] font-bold uppercase text-slate-500">Verificación</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-safety/20 bg-safety/10 p-5 text-sm text-slate-200">
          <strong className="text-white">Vista de diseño:</strong> esta pantalla es una previsualización administrativa. Los datos mostrados (número, resultado y QR) son de ejemplo y no representan un certificado válido.
        </div>
      </div>
    </main>
  );
}
