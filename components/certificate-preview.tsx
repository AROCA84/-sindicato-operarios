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
  const [paymentUrl, setPaymentUrl] = useState("");
  const [affiliationNumber, setAffiliationNumber] = useState("");
  const [error, setError] = useState("");
  const [startingPayment, setStartingPayment] = useState(false);
  const searchParams = useSearchParams();
  const internalTest = searchParams.get("prueba") === "1";
  const returnedCode = searchParams.get("codigo")?.trim() || "";
  const paymentReturnOk = searchParams.get("pago") === "ok";

  useEffect(() => {
    setAffiliationNumber(window.localStorage.getItem("sdo-numero-afiliado") || "");
    const storedName = [window.localStorage.getItem("sdo-afiliado-nombre"), window.localStorage.getItem("sdo-afiliado-apellidos")].filter(Boolean).join(" ");
    if (storedName) setName(storedName);
    const storedEmail = window.localStorage.getItem("sdo-afiliado-email");
    if (storedEmail) setEmail(storedEmail);
    if (returnedCode) {
      setCertificateCode(returnedCode);
      setPaymentUrl(`/api/certificados/pago?codigo=${encodeURIComponent(returnedCode)}`);
      setPaymentStarted(true);
    }
    if (internalTest) {
      setCertificateCode("SDO-PRUEBA-INTERNA");
      setPaymentStarted(true);
      setPaymentConfirmed(true);
    }
  }, [internalTest, returnedCode]);

  useEffect(() => {
    if (!paymentReturnOk || !returnedCode) return;
    let active = true;
    let timer: number | undefined;
    let attempts = 0;

    const poll = async () => {
      if (!active) return;
      attempts += 1;
      try {
        const response = await fetch(`/api/certificados/estado?codigo=${encodeURIComponent(returnedCode)}`, { cache: "no-store" });
        const data = await response.json();
        if (active && response.ok && data.emitido) {
          setPaymentConfirmed(true);
          setError("");
          return;
        }
        if (active && attempts < 12) {
          timer = window.setTimeout(poll, 2500);
          return;
        }
        if (active && response.ok) {
          setError("El pago ha vuelto correctamente, pero myPOS todavía no ha confirmado la emisión. Pulsa «Comprobar pago» para reintentarlo.");
        }
      } catch {
        if (active && attempts < 12) {
          timer = window.setTimeout(poll, 2500);
          return;
        }
        if (active) setError("No se pudo comprobar automáticamente el pago. Pulsa «Comprobar pago» para reintentarlo.");
      }
    };

    poll();
    return () => {
      active = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [paymentReturnOk, returnedCode]);

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
    setStartingPayment(true);
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
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
      window.clearTimeout(timeout);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo iniciar el certificado.");
      const nextPaymentUrl = data.payment_url || `/api/certificados/pago?codigo=${encodeURIComponent(data.codigo)}`;
      setCertificateCode(data.codigo);
      setPaymentUrl(nextPaymentUrl);
      setPaymentStarted(true);
    } catch (e) {
      setError(e instanceof DOMException && e.name === "AbortError" ? "La preparación del pago está tardando demasiado. Vuelve a intentarlo." : e instanceof Error ? e.message : "No se pudo iniciar el certificado.");
    } finally {
      setStartingPayment(false);
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
      pdf.setTextColor(27, 122, 72); pdf.setFont("helvetica", "bold"); pdf.setFontSize(7); pdf.text("RESULTADO", 64.5, 147, { align: "center" }); pdf.setFontSize(14); pdf.text("APTO", 64.5, 157, { align: "center" });
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6.5); pdf.text("Nº DE AFILIADO", 98, 145); pdf.text("CÓDIGO DE VERIFICACIÓN", 98, 156); pdf.text("CORREO ELECTRÓNICO", 98, 167);
      pdf.setTextColor(navy); pdf.setFontSize(9); pdf.text(affiliationNumber, 98, 150.5); pdf.setFontSize(8); pdf.text(certificateCode, 98, 161.5); pdf.setFontSize(email.trim().length > 35 ? 6.8 : 8); pdf.text(email.trim(), 98, 172);
      pdf.setDrawColor(navy); pdf.setLineWidth(0.6); pdf.roundedRect(239, 136, 39, 39, 2, 2, "S"); pdf.addImage(qrDataUrl, "PNG", 242, 139, 33, 33);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(5.2); pdf.text("ESCANEA PARA VERIFICAR", 258.5, 179, { align: "center" });
      pdf.setDrawColor(220, 224, 227); pdf.setLineWidth(0.3); pdf.line(20, 184, 277, 184);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "normal"); pdf.setFontSize(5.8); pdf.text("Documento emitido por Sindicato de Operarios · Verificación digital mediante código QR.", 20, 189);
      pdf.setFontSize(5.3); pdf.text("La formación y el test se realizan gratuitamente. El certificado se obtiene tras superar la evaluación.", 20, 197);
      pdf.setTextColor(orange); pdf.setFont("helvetica", "bold"); pdf.text("SINDICATO DE OPERARIOS", 277, 197, { align: "right" });
      const safeName = name.trim().replace(/[^a-zA-Z0-9À-ÿ]+/g, "-").replace(/^-|-$/g, "");
      pdf.save(`Certificado-Sindicato-de-Operarios-${safeName || "alumno"}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="certificate-preview space-y-6">
      <div className="rounded-3xl border border-safety/30 bg-navy p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-4"><SindicatoMark /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Certificación</p><h2 className="mt-1 text-2xl font-black text-white">Diploma Digital</h2></div></div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{internalTest ? "Ruta interna de prueba: puedes simular el pago sin realizar ningún cobro y comprobar la descarga del certificado." : "Obtén tu certificado digital verificable tras superar el test. El certificado cuesta 4,99 € y puedes descargarlo inmediatamente después de pagar."}</p>
        <label className="mt-6 block text-sm font-bold text-white">Nombre y apellidos<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellidos" autoComplete="name" type="text" className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white placeholder-slate-400 focus:border-safety focus:outline-none" /></label>
        <label className="mt-4 block text-sm font-bold text-white">Correo electrónico<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white placeholder-slate-400 focus:border-safety focus:outline-none" /></label>
        {!paymentStarted ? (
          <button type="button" disabled={!canPreview || startingPayment} onClick={goToPayment} className="mt-5 w-full rounded-xl bg-safety px-5 py-4 text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed">
            {startingPayment ? "Preparando pago..." : "Pagar 4,99 €"}
          </button>
        ) : (
          <div className="mt-5 space-y-3">
            {internalTest ? <button type="button" onClick={simulateInternalPayment} className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy">Simular pago completado</button> : (
              <form action={paymentUrl} method="get" target="_blank">
                <button type="submit" className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400">
                  PAGAR 4,99 € CON myPOS
                </button>
              </form>
            )}
            {!internalTest ? <button type="button" onClick={checkPayment} className="block w-full rounded-xl border-2 border-safety bg-transparent px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-safety hover:bg-safety/10">
              Comprobar pago
            </button> : null}
          </div>
        )}
        {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
        <p className="mt-3 text-center text-xs leading-5 text-slate-400">La formación y el test son gratuitos. El certificado cuesta 4,99 € y el pago se realiza mediante myPOS.</p>
      </div>

      {paymentConfirmed && (
        <>
          <section className="overflow-hidden rounded-[2rem] bg-[#f7f5ef] p-3 shadow-2xl ring-1 ring-black/10 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border-[3px] border-[#101820] bg-white px-5 py-7 text-slate-900 sm:px-10 sm:py-9">
              <div className="pointer-events-none absolute inset-2 rounded-[1.1rem] border border-[#f5b400]/70" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b-2 border-[#f5b400] pb-5"><div className="flex items-center gap-3"><SindicatoMark /><div><p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Certificado</p><p className="mt-0.5 text-lg font-black text-[#101820]">Verificado ✓</p></div></div><div className="text-right"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Código de verificación</p><p className="mt-1 font-mono text-sm font-bold text-[#101820]">{certificateCode}</p></div></div>
                <div className="py-7 text-center"><p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Certificado de formación y aptitud</p><p className="mt-3 break-words text-lg font-black text-[#101820]">{name.trim()}</p><p className="mt-1 text-xs text-slate-500">{courseTitle}</p></div>
                <div className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-[1fr_150px] sm:items-center"><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Resultado</p><p className="mt-2 text-2xl font-black text-[#101820]">{score}/{total}</p><p className="mt-1 text-xs font-bold text-emerald-600">✓ APTO</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Estado</p><p className="mt-2 text-sm font-black text-[#101820]">Emitido</p><p className="mt-1 text-xs font-bold text-emerald-600">✓ Pagado</p></div></div><button onClick={downloadCertificate} disabled={downloading} className="rounded-xl bg-[#101820] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white hover:bg-slate-800 disabled:opacity-50"><span className="block text-lg">↓</span>Descargar PDF</button></div>
                <div className="mt-5 flex flex-col gap-1 border-t border-slate-200 pt-4 text-[7px] font-bold uppercase tracking-wide text-slate-400 sm:flex-row sm:justify-between"><span>SINDICATO DE OPERARIOS</span><span>•</span><span>Verificación digital mediante QR</span></div>
              </div>
            </div>
          </section>
          <div className="rounded-2xl border border-safety/30 bg-safety/10 p-6 text-center"><p className="text-sm font-black uppercase tracking-wide text-safety">✓ Pago confirmado</p><h3 className="mt-2 text-lg font-black text-white">Tu certificado está listo para descargar</h3><p className="mt-2 text-sm text-slate-300">Guarda el PDF en tu dispositivo. Puedes verificarlo en línea usando el código QR.</p></div>
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
