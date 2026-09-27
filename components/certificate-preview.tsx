"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  courseId: string;
  courseTitle: string;
  score: number;
  total: number;
};

export function CertificatePreview({ courseId, courseTitle, score, total }: Props) {
  const [name, setName] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const affiliationNumber = useMemo(() => {
    if (typeof window === "undefined") return "1000";
    const saved = window.localStorage.getItem("sindicato_affiliation_preview");
    if (saved) return saved;
    window.localStorage.setItem("sindicato_affiliation_preview", "1000");
    return "1000";
  }, []);

  const verificationUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/verificar/" + affiliationNumber
      : "/verificar/" + affiliationNumber;

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=" +
    encodeURIComponent(verificationUrl);

  const canPreview = name.trim().length >= 3;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-safety/30 bg-navy p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Paso 1 · Identificación</p>
        <h2 className="mt-2 text-2xl font-black text-white">¿Quieres certificar tus aptitudes?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Introduce tu nombre para preparar la tarjeta de aptitud. La previsualización estará protegida hasta completar la certificación.
        </p>
        <label className="mt-6 block text-sm font-bold text-white">
          Nombre y apellidos
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Escribe tu nombre completo"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none ring-safety focus:ring-2"
          />
        </label>
        <button
          type="button"
          disabled={!canPreview}
          onClick={() => setShowPreview(true)}
          className="mt-5 w-full rounded-xl bg-safety px-5 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:bg-safety-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ver mi tarjeta de aptitud
        </button>
      </div>

      {showPreview && canPreview && (
        <>
          <section className="relative overflow-hidden rounded-3xl bg-white p-5 text-slate-900 shadow-2xl ring-4 ring-slate-200 sm:p-8">
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/20 backdrop-blur-[5px]">
              <div className="mx-6 rounded-2xl border border-white/80 bg-slate-950/85 px-5 py-4 text-center text-white shadow-2xl">
                <p className="text-sm font-black uppercase tracking-wider text-safety">Previsualización protegida</p>
                <p className="mt-1 text-xs leading-5 text-slate-200">El documento definitivo se habilita al completar la certificación.</p>
              </div>
            </div>
            <div className="relative z-0">
              <div className="flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">SINDICATO DE OPERARIOS</p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-tight">Tarjeta de aptitud</h3>
                </div>
                <div className="rounded-xl bg-slate-900 px-3 py-2 text-center text-white">
                  <span className="block text-[9px] font-black uppercase">Apto</span>
                  <span className="text-xl font-black">✓</span>
                </div>
              </div>
              <div className="grid gap-6 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Alumno</p>
                  <p className="mt-1 text-2xl font-black">{name}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Formación superada</p>
                  <p className="mt-1 text-lg font-bold">{courseTitle}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="rounded-lg bg-slate-100 px-3 py-2">
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Nº afiliación</span>
                      <span className="font-black">SO-{affiliationNumber}</span>
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2">
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Resultado</span>
                      <span className="font-black">{score}/{total}</span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto rounded-xl border-4 border-slate-900 p-2">
                  <img src={qrUrl} alt="Código QR de verificación" width={150} height={150} className="h-[150px] w-[150px]" />
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 text-center text-xs font-bold uppercase tracking-wide text-slate-600">
                Apto · Enhorabuena · Certificación de aptitudes
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-orange-400/30 bg-orange-400/10 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-orange-200">Eres apto. ¡Enhorabuena!</p>
            <h3 className="mt-2 text-2xl font-black text-white">¿Quieres certificar tus aptitudes?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">La certificación cuesta 4,99 € y solo se solicita después de aprobar el test.</p>
            <button type="button" className="mt-5 w-full rounded-xl bg-safety px-6 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:bg-safety-dark">
              Certificar mis aptitudes · 4,99 €
            </button>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              En el siguiente paso conectaremos este botón con el pago y, una vez confirmado, se desbloqueará el certificado definitivo.
            </p>
          </div>
        </>
      )}

      <Link href={"/cursos/" + courseId} className="block text-center text-sm font-semibold text-slate-500 hover:text-white">
        ← Volver al curso
      </Link>
    </div>
  );
}
