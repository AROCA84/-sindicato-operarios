"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";
import jsPDF from "jspdf";

type Props = {
  courseId: string;
  courseTitle: string;
  score: number;
  total: number;
  attemptId: string;
};

const PAYMENT_URL = "/api/certificados/pago";

function SindicatoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-12 w-12" : "h-16 w-16";
  return (
    <svg viewBox="0 0 72 72" className={`${box} shrink-0`} role="img" aria-label="Emblema Sindicato de Operarios">
      <circle cx="36" cy="36" r="33" fill="#101820" stroke="#f5b400" strokeWidth="2.5" />
      <path d="M36 9 16 16v16c0 12 8.8 21 20 26 11.2-5 20-14 20-26V16L36 9Z" fill="#243746" stroke="#f5b400" strokeWidth="2" />
      <path d="M22 39h28v4H22z" fill="#f5b400" />
      <path d="M25 36c0-7 4.8-12 11-12s11 5 11 12H25Z" fill="#f5b400" />
      <path d="M33 24h6v-5h-6z" fill="#d89500" />
      <circle cx="36" cy="35" r="3.5" fill="#101820" />
      <path d="M17 51c5 4 11 7 19 10 8-3 14-6 19-10" fill="none" stroke="#f5b400" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CertificatePreview({ courseId, courseTitle, score, total, attemptId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [certificateCode, setCertificateCode] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(PAYMENT_URL);
  const [affiliationNumber, setAffiliationNumber] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const internalTest = searchParams.get("prueba") === "1";

  useEffect(() => {
    setAffiliationNumber(window.localStorage.getItem("sdo-numero-afiliado") || "");
    const storedName = [window.localStorage.getItem("sdo-afiliado-nombre"), window.localStorage.getItem("sdo-afiliado-apellidos")].filter(Boolean).join(" ");
    if (storedName) setName(storedName);
    const storedEmail = window.localStorage.getItem("sdo-afiliado-email");
    if (storedEmail) setEmail(storedEmail);
    if (internalTest) {
      setCertificateCode("SDO-PRUEBA-INTERNA");
      setPaymentStarted(true);
      setPaymentConfirmed(false);
    }
  }, [internalTest]);

  const verificationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verificar?codigo=${encodeURIComponent(certificateCode)}`
    : `/verificar?codigo=${encodeURIComponent(certificateCode)}`;

  const canPreview = name.trim().length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function simulateInternalPayment() {
    setError("");
    setCertificateCode("SDO-PRUEBA-INTERNA");
    setPaymentStarted(true);
    setPaymentConfirmed(true);
  }

  async function goToPayment() {
    if (internalTest) return simulateInternalPayment();
    if (!canPreview || !affiliationNumber || !attemptId) return;
    setError("");
    try {
      const response = await fetch("/api/certificados/iniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          numero_afiliado: Number(affiliationNumber),
          curso_id: courseId,
          intento_id: attemptId,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo iniciar el certificado.");
      setCertificateCode(data.codigo);
      setPaymentUrl(data.payment_url || `${PAYMENT_URL}?codigo=${encodeURIComponent(data.codigo)}`);
      setPaymentStarted(true);
      window.location.href = data.payment_url || PAYMENT_URL;
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar el certificado.");
    }
  }

  async function checkPayment() {
    if (!certificateCode) return;
    setError("");
    try {
      const response = await fetch(`/api/certificados/estado?codigo=${encodeURIComponent(certificateCode)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo comprobar el pago.");
      if (data.emitido) {
        setPaymentConfirmed(true);
      } else {
        setError("El pago todavía no ha sido confirmado. Si acabas de pagar, espera unos segundos y vuelve a comprobarlo.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo comprobar el pago.");
    }
  }

  async function downloadCertificate() {
    if (!canPreview || downloading || !paymentConfirmed || !certificateCode) return;
    setDownloading(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, { width: 420, margin: 2, errorCorrectionLevel: "H" });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297, H = 210, navy = "#101820", gold = "#f5b400", orange = "#e86f00", grey = "#68727c";
      pdf.setFillColor(255, 255, 255); pdf.rect(0, 0, W, H, "F");
      pdf.setDrawColor(navy); pdf.setLineWidth(1.4); pdf.rect(8, 8, W - 16, H - 16, "S");
      pdf.setDrawColor(gold); pdf.setLineWidth(0.7); pdf.rect(12, 12, W - 24, H - 24, "S");
      pdf.setFillColor(navy); pdf.rect(8, 8, W - 16, 27, "F");
      pdf.setFillColor(gold); pdf.rect(8, 32.5, W - 16, 2.5, "F");
      pdf.setFillColor(gold); pdf.circle(26.5, 22.5, 8.5, "F");
      pdf.setFillColor(navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10.5); pdf.text("SO", 26.5, 25.7, { align: "center" });
      pdf.setDrawColor(gold); pdf.setLineWidth(0.6); pdf.circle(26.5, 22.5, 6.2, "S");
      pdf.setTextColor(255, 255, 255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(15); pdf.text("SINDICATO DE OPERARIOS", 42, 21.5);
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(6.8); pdf.setTextColor(210, 218, 224); pdf.text("FORMACIÓN PROFESIONAL · CERTIFICACIÓN DE APTITUD", 42, 27);
      pdf.setTextColor(navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(25); pdf.text("CERTIFICADO", W / 2, 53, { align: "center" });
      pdf.setFontSize(8.5); pdf.setTextColor(grey); pdf.text("DE FORMACIÓN Y APTITUD", W / 2, 60, { align: "center" });
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(7.5); pdf.text("SE CERTIFICA QUE", W / 2, 73, { align: "center" });
      pdf.setTextColor(navy); pdf.setFontSize(name.trim().length > 32 ? 19 : 23); pdf.text(name.trim(), W / 2, 85, { align: "center" });
      pdf.setDrawColor(gold); pdf.setLineWidth(0.8); pdf.line(62, 91, 235, 91);
      pdf.setFillColor(245, 247, 248); pdf.roundedRect(38, 99, 221, 30, 3, 3, "F");
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(7); pdf.text("FORMACIÓN SUPERADA", W / 2, 108, { align: "center" });
      pdf.setTextColor(navy); pdf.setFontSize(courseTitle.length > 58 ? 10.5 : 13);
      const courseLines = courseTitle.trim().split(/\s+/).reduce<string[]>((lines, word) => {
        const current = lines[lines.length - 1] || "";
        if (!current || (current + " " + word).length <= (courseTitle.length > 58 ? 55 : 62)) {
          if (lines.length === 0) lines.push(word); else lines[lines.length - 1] = current ? current + " " + word : word;
        } else lines.push(word);
        return lines;
      }, []).slice(0, 2);
      courseLines.forEach((line, index) => pdf.text(line, W / 2, 117 + index * 6, { align: "center" }));
      pdf.setFillColor(225, 247, 235); pdf.roundedRect(42, 139, 45, 24, 3, 3, "F");
      pdf.setTextColor(27, 122, 72); pdf.setFont("helvetica", "bold"); pdf.setFontSize(7); pdf.text("RESULTADO", 64.5, 147, { align: "center" }); pdf.setFontSize(14); pdf.text("APTO", 64.5, 157, { align: "center" }); pdf.setFontSize(6.5); pdf.text(`${score}/${total} respuestas`, 64.5, 161, { align: "center" });
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6.5); pdf.text("Nº DE AFILIADO", 98, 145); pdf.text("CÓDIGO DE VERIFICACIÓN", 98, 156); pdf.text("CORREO ELECTRÓNICO", 98, 167);
      pdf.setTextColor(navy); pdf.setFontSize(9); pdf.text(affiliationNumber, 98, 150.5); pdf.setFontSize(8); pdf.text(certificateCode, 98, 161.5); pdf.setFontSize(email.trim().length > 35 ? 6.8 : 8); pdf.text(email.trim(), 98, 172.5);
      pdf.setDrawColor(navy); pdf.setLineWidth(0.6); pdf.roundedRect(239, 136, 39, 39, 2, 2, "S"); pdf.addImage(qrDataUrl, "PNG", 242, 139, 33, 33);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(5.2); pdf.text("ESCANEA PARA VERIFICAR", 258.5, 179, { align: "center" });
      pdf.setDrawColor(220, 224, 227); pdf.setLineWidth(0.3); pdf.line(20, 184, 277, 184);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "normal"); pdf.setFontSize(5.8); pdf.text("Documento emitido por Sindicato de Operarios · Verificación digital mediante código QR.", 20, 191); pdf.text(`Código ${certificateCode}`, 277, 191, { align: "right" });
      pdf.setFontSize(5.3); pdf.text("La formación y el test se realizan gratuitamente. El certificado se obtiene tras superar la evaluación.", 20, 197);
      pdf.setTextColor(orange); pdf.setFont("helvetica", "bold"); pdf.text("SINDICATO DE OPERARIOS", 277, 197, { align: "right" });
      const safeName = name.trim().replace(/[^a-zA-Z0-9À-ÿ]+/g, "-").replace(/^-|-$/g, "");
      pdf.save(`Certificado-Sindicato-de-Operarios-${safeName || "alumno"}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-safety/30 bg-navy p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-4"><SindicatoMark /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Certificación</p><h2 className="mt-1 text-2xl font-black text-white">Completa tus datos</h2></div></div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{internalTest ? "Ruta interna de prueba: puedes simular el pago sin realizar ningún cobro y comprobar la descarga del certificado." : "Introduce tus datos. El certificado se podrá visualizar y descargar únicamente después de que myPOS confirme el pago de 4,99 €."}</p>
        <label className="mt-6 block text-sm font-bold text-white">Nombre y apellidos<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellidos" autoComplete="name" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety" /></label>
        <label className="mt-4 block text-sm font-bold text-white">Correo electrónico<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety" /></label>
        {!paymentStarted ? (
          <button type="button" disabled={!canPreview} onClick={goToPayment} className="mt-5 w-full rounded-xl bg-safety px-5 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:bg-safety-dark disabled:cursor-not-allowed disabled:opacity-40">{internalTest ? "Simular pago · 0,00 € (prueba)" : "Continuar al pago · 4,99 €"}</button>
        ) : (
          <div className="mt-5 space-y-3">
{internalTest ? <button type="button" onClick={simulateInternalPayment} className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy">Simular pago · 0,00 € (no cobra)</button> : <><a href={paymentUrl} target="_blank" rel="noreferrer" className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy">Pagar 4,99 € en myPOS</a><button type="button" onClick={checkPayment} className="w-full rounded-xl border-2 border-safety bg-safety/10 px-5 py-4 text-sm font-black uppercase tracking-wide text-safety transition hover:bg-safety/20">Comprobar pago y desbloquear certificado</button></>}
          </div>
        )}
        {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
        <p className="mt-3 text-center text-xs leading-5 text-slate-400">Estudiar y hacer el test es gratis. El certificado cuesta 4,99 € y el pago se realiza mediante myPOS.</p>
      </div>

      {paymentConfirmed && (
        <>
          <section className="overflow-hidden rounded-[2rem] bg-[#f7f5ef] p-3 shadow-2xl ring-1 ring-black/10 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border-[3px] border-[#101820] bg-white px-5 py-7 text-slate-900 sm:px-10 sm:py-9">
              <div className="pointer-events-none absolute inset-2 rounded-[1.1rem] border border-[#f5b400]/70" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b-2 border-[#f5b400] pb-5"><div className="flex items-center gap-3"><SindicatoMark /><div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">SINDICATO DE</p><p className="text-xl font-black uppercase tracking-tight text-[#101820] sm:text-2xl">OPERARIOS</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">Formación profesional</p></div></div><div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-center"><p className="text-[8px] font-black uppercase tracking-widest text-emerald-700">Resultado</p><p className="text-xl font-black text-emerald-700">APTO</p><p className="text-[8px] font-bold text-emerald-700">{score}/{total}</p></div></div>
                <div className="py-7 text-center"><p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">CERTIFICADO DE FORMACIÓN Y APTITUD</p><p className="mt-3 break-words text-3xl font-black tracking-tight text-[#101820] sm:text-4xl">{name}</p><div className="mx-auto mt-3 h-1 w-32 rounded-full bg-[#f5b400]" /><p className="mt-5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Formación superada</p><p className="mx-auto mt-2 max-w-3xl text-base font-black leading-6 text-slate-800 sm:text-lg">{courseTitle}</p></div>
                <div className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-[1fr_150px] sm:items-center"><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-slate-50 p-3"><p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Nº de afiliado</p><p className="mt-1 text-sm font-black text-[#101820]">{affiliationNumber}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Código de verificación</p><p className="mt-1 text-sm font-black text-[#101820]">{certificateCode}</p></div><div className="rounded-xl bg-slate-50 p-3 sm:col-span-2"><p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Correo electrónico</p><p className="mt-1 break-all text-sm font-bold text-[#101820]">{email}</p></div></div><div className="mx-auto text-center"><div className="rounded-xl border-2 border-[#101820] bg-white p-2"><QRCodeImage url={verificationUrl} /></div><p className="mt-2 text-[7px] font-black uppercase tracking-wider text-slate-400">Escanea para verificar</p></div></div>
                <div className="mt-5 flex flex-col gap-1 border-t border-slate-200 pt-4 text-[7px] font-bold uppercase tracking-wide text-slate-400 sm:flex-row sm:justify-between"><span>SINDICATO DE OPERARIOS · {certificateCode}</span><span>Documento de certificación de aptitudes</span></div>
              </div>
            </div>
          </section>
          <div className="rounded-2xl border border-safety/30 bg-safety/10 p-6 text-center"><p className="text-sm font-black uppercase tracking-wide text-safety">✓ Pago confirmado</p><h3 className="mt-2 text-2xl font-black text-white">Tu certificado está listo</h3><p className="mt-2 text-sm leading-6 text-slate-300">Puedes descargar el PDF con el diseño profesional, número de afiliado y QR de verificación.</p><button type="button" onClick={downloadCertificate} disabled={downloading} className="mt-5 w-full rounded-xl bg-safety px-6 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:bg-safety-dark disabled:opacity-60">{downloading ? "Preparando PDF…" : "Descargar certificado PDF"}</button></div>
        </>
      )}
      <Link href={`/cursos/${courseId}`} className="block text-center text-sm font-semibold text-slate-500 hover:text-white">← Volver al curso</Link>
    </div>
  );
}

function QRCodeImage({ url }: { url: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, { width: 240, margin: 1, errorCorrectionLevel: "H" }).then((value) => { if (active) setSrc(value); }).catch(() => undefined);
    return () => { active = false; };
  }, [url]);
  if (!src) return <div className="h-[130px] w-[130px] animate-pulse bg-slate-100" />;
  return <img src={src} alt="Código QR de verificación" className="h-[130px] w-[130px]" />;
}