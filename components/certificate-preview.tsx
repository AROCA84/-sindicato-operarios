"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  courseId: string;
  courseTitle: string;
  score: number;
  total: number;
};

function createAffiliationNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${year}-${random}`;
}

function SindicatoMark() {
  return (
    <svg
      viewBox="0 0 72 72"
      className="h-14 w-14 shrink-0"
      role="img"
      aria-label="Logotipo Sindicato de Operarios"
    >
      <path
        d="M36 3 8 13v21c0 16 12.5 27.3 28 33 15.5-5.7 28-17 28-33V13L36 3Z"
        fill="#0e2340"
        stroke="#ffc400"
        strokeWidth="3"
      />
      <circle cx="36" cy="36" r="17" fill="#16345e" />
      <path d="M23 42h26v4H23z" fill="#ffc400" />
      <path d="M25 39c0-8 5-13 11-13s11 5 11 13H25Z" fill="#ffc400" />
      <path d="M33 26h6v-5h-6z" fill="#e0aa00" />
      <circle cx="36" cy="36" r="4" fill="#0e2340" />
    </svg>
  );
}

export function CertificatePreview({ courseId, courseTitle, score, total }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const affiliationNumber = useMemo(() => createAffiliationNumber(), []);

  const verificationParams = new URLSearchParams({
    codigo: "SO-" + affiliationNumber,
    nombre: name.trim(),
    curso: courseTitle,
    resultado: "APTO",
  });
  const verificationUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/verificar?" + verificationParams.toString()
      : "/verificar?" + verificationParams.toString();

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=" +
    encodeURIComponent(verificationUrl);

  const canPreview =
    name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-safety/30 bg-navy p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-safety">
          Paso 1 · Identificación
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">
          Prepara tu tarjeta de aptitud
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Introduce tus datos exactamente como quieres que aparezcan en la
          documentación. El número de afiliado se genera automáticamente para
          esta certificación.
        </p>

        <label className="mt-6 block text-sm font-bold text-white">
          Nombre y apellidos
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre y apellidos"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety"
          />
        </label>

        <label className="mt-4 block text-sm font-bold text-white">
          Correo electrónico
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety"
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
          <section className="relative overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200 print:shadow-none">
            <div className="absolute right-0 top-0 h-2 w-full bg-safety" />

            <div className="p-6 sm:p-9">
              <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-6">
                <div className="flex min-w-0 items-center gap-4">
                  <SindicatoMark />
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                      SINDICATO DE
                    </p>
                    <p className="text-xl font-black uppercase tracking-tight text-slate-950 sm:text-2xl">
                      OPERARIOS
                    </p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Formación Profesional
                    </p>
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-center">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-emerald-700">
                    Resultado
                  </span>
                  <span className="mt-0.5 block text-2xl font-black text-emerald-700">
                    APTO
                  </span>
                  <span className="block text-xs font-bold text-emerald-700">
                    ✓
                  </span>
                </div>
              </div>

              <div className="grid gap-8 py-8 sm:grid-cols-[1fr_190px] sm:items-center">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Titular de la tarjeta
                  </p>
                  <p className="mt-2 max-w-full break-words text-xl font-black leading-tight text-slate-950 sm:text-2xl">
                    {name}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Nº de afiliado
                      </p>
                      <p className="mt-1 text-sm font-black text-slate-900">
                        SO-{affiliationNumber}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Resultado
                      </p>
                      <p className="mt-1 text-sm font-black text-slate-900">
                        {score}/{total} · Apto
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Correo electrónico
                      </p>
                      <p className="mt-1 break-all text-sm font-bold text-slate-900">
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border-l-4 border-safety bg-slate-50 p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                      Formación superada
                    </p>
                    <p className="mt-1 text-sm font-black leading-5 text-slate-800">
                      {courseTitle}
                    </p>
                  </div>
                </div>

                <div className="mx-auto text-center">
                  <div className="rounded-2xl border-2 border-slate-900 bg-white p-2">
                    <img
                      src={qrUrl}
                      alt="Código QR de verificación"
                      width={170}
                      height={170}
                      className="h-[170px] w-[170px]"
                    />
                  </div>
                  <p className="mt-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                    Verificación digital
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <span>SINDICATO DE OPERARIOS · SO-{affiliationNumber}</span>
                <span>Documento de certificación de aptitudes</span>
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-orange-400/30 bg-orange-400/10 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-orange-200">
              Eres apto. ¡Enhorabuena!
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              ¿Quieres obtener tu certificado?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Estudiar y hacer el test es gratis. Solo pagas al final si
              quieres obtener tu certificado.
            </p>
            <a
              href="https://mypos.com/@sindicato499/4.99"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full rounded-xl bg-safety px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-navy transition hover:bg-safety-dark"
            >
              Obtener certificado · 4,99 €
            </a>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Pago seguro mediante myPOS. El importe de 4,99 € se solicita
              únicamente después de aprobar.
            </p>
          </div>
        </>
      )}

      <Link
        href={"/cursos/" + courseId}
        className="block text-center text-sm font-semibold text-slate-500 hover:text-white"
      >
        ← Volver al curso
      </Link>
    </div>
  );
}
