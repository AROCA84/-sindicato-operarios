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
  /** Server-validated internal preview flag (requires ENABLE_INTERNAL_PREVIEW=1). */
  internalTest?: boolean;
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

export function CertificatePreview({ courseId, courseTitle, score, total, attemptId, internalTest = false }: Props) {
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
  const returnedCode = searchParams.get("codigo")?.trim() || "";
  const paymentReturnOk = searchParams.get("pago") === "ok";

  // Once issued, the certificate shows the holder stored in the database, not what was typed.
  function applyIssuedCertificate(data: { nombre?: unknown; numero_afiliado?: unknown }) {
    if (typeof data.nombre === "string" && data.nombre.trim()) setName(data.nombre.trim());
    if (data.numero_afiliado !== undefined && data.numero_afiliado !== null && String(data.numero_afiliado).trim()) setAffiliationNumber(String(data.numero_afiliado));
    setPaymentConfirmed(true);
  }

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
          applyIssuedCertificate(data);
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
      // El botón CERTIFÍCATE debe llevar directamente al checkout de myPOS.
      // No dependemos de un segundo clic ni de un formulario oculto.
      window.location.assign(nextPaymentUrl);
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
        applyIssuedCertificate(data);
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
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, { width: 420, margin: 1, errorCorrectionLevel: "H" });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297, H = 210;
      const navy = "#111A22", navy2 = "#1D2A35", gold = "#D99A00", orange = "#E36B16";
      const cream = "#F7F3EA", warm = "#EFE8D8", grey = "#66717A", green = "#247A50";
      const today = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });

      // Fondo y marco exterior
      pdf.setFillColor(247, 243, 234); pdf.rect(0, 0, W, H, "F");
      pdf.setFillColor(17, 26, 34); pdf.rect(0, 0, 8, H, "F");
      pdf.setFillColor(217, 154, 0); pdf.rect(8, 0, 2.5, H, "F");
      pdf.setDrawColor(17, 26, 34); pdf.setLineWidth(0.8); pdf.rect(15, 12, W - 27, H - 24, "S");
      pdf.setDrawColor(217, 154, 0); pdf.setLineWidth(0.35); pdf.rect(19, 16, W - 35, H - 32, "S");

      // Cabecera institucional
      pdf.setFillColor(17, 26, 34); pdf.roundedRect(24, 22, 249, 31, 2, 2, "F");
      pdf.setFillColor(217, 154, 0); pdf.circle(40, 37.5, 9.5, "F");
      pdf.setFillColor(17, 26, 34); pdf.circle(40, 37.5, 7.1, "F");
      pdf.setDrawColor(217, 154, 0); pdf.setLineWidth(0.55); pdf.circle(40, 37.5, 6.1, "S");
      pdf.setTextColor(217, 154, 0); pdf.setFont("helvetica", "bold"); pdf.setFontSize(8); pdf.text("SO", 40, 40.1, { align: "center" });
      pdf.setTextColor(255, 255, 255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(13); pdf.text("SINDICATO DE OPERARIOS", 56, 36.2);
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(6.3); pdf.setTextColor(205, 213, 218); pdf.text("ACREDITACIÓN DE FORMACIÓN PROFESIONAL", 56, 43);
      pdf.setDrawColor(217, 154, 0); pdf.setLineWidth(0.45); pdf.line(224, 31, 224, 45);
      pdf.setTextColor(217, 154, 0); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6); pdf.text("DOCUMENTO", 233, 35);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(8); pdf.text("CERTIFICADO", 233, 42);

      // Título
      pdf.setTextColor(17, 26, 34); pdf.setFont("helvetica", "bold"); pdf.setFontSize(25);
      pdf.text("CERTIFICADO", W / 2, 69, { align: "center" });
      pdf.setTextColor(gold); pdf.setFontSize(7.2); pdf.text("DE FORMACIÓN Y APTITUD", W / 2, 76, { align: "center" });
      pdf.setDrawColor(gold); pdf.setLineWidth(0.8); pdf.line(105, 80, 192, 80);

      // Titular
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6.8); pdf.text("SE ACREDITA QUE", W / 2, 91, { align: "center" });
      pdf.setTextColor(navy); pdf.setFont("times", "italic"); pdf.setFontSize(name.trim().length > 34 ? 18 : 22);
      pdf.text(name.trim(), W / 2, 102, { align: "center" });
      pdf.setDrawColor(217, 154, 0); pdf.setLineWidth(0.45); pdf.line(76, 107, 221, 107);

      // Formación
      pdf.setFillColor(239, 232, 216); pdf.roundedRect(45, 115, 207, 31, 2.5, 2.5, "F");
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6.2); pdf.text("FORMACIÓN SUPERADA", W / 2, 123, { align: "center" });
      pdf.setTextColor(navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(courseTitle.length > 58 ? 10.5 : 12.2);
      const courseLines = courseTitle.trim().split(/\\s+/).reduce<string[]>((lines, word) => {
        const current = lines[lines.length - 1] || "";
        const maxChars = courseTitle.length > 58 ? 55 : 65;
        if (!current) lines.push(word);
        else if ((current + " " + word).length <= maxChars) lines[lines.length - 1] = current + " " + word;
        else lines.push(word);
        return lines;
      }, []).slice(0, 2);
      courseLines.forEach((line, index) => pdf.text(line, W / 2, 133 + index * 6, { align: "center" }));

      // Resultado destacado
      pdf.setFillColor(36, 122, 80); pdf.roundedRect(45, 153, 48, 25, 3, 3, "F");
      pdf.setTextColor(255, 255, 255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6); pdf.text("EVALUACIÓN", 69, 161, { align: "center" });
      pdf.setFontSize(13); pdf.text("APTO", 69, 171, { align: "center" });
      pdf.setFontSize(6); pdf.setFont("helvetica", "normal"); pdf.text(`${score}/${total} respuestas`, 69, 176, { align: "center" });

      // Datos del documento
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(5.8);
      pdf.text("Nº DE AFILIADO", 103, 157); pdf.text("CÓDIGO DE VERIFICACIÓN", 103, 166); pdf.text("FECHA DE EMISIÓN", 103, 175);
      pdf.setTextColor(navy); pdf.setFontSize(7.5); pdf.text(affiliationNumber || "—", 103, 161.5);
      pdf.setFont("courier", "bold"); pdf.setFontSize(7); pdf.text(certificateCode, 103, 170.5);
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(7); pdf.text(today, 103, 179.5);

      // Firma y sello
      pdf.setDrawColor(130, 137, 143); pdf.setLineWidth(0.35); pdf.line(178, 174, 218, 174);
      pdf.setTextColor(navy); pdf.setFont("times", "italic"); pdf.setFontSize(10); pdf.text("Sindicato de Operarios", 198, 170.5, { align: "center" });
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(5.2); pdf.setTextColor(grey); pdf.text("FIRMA DE EMISIÓN", 198, 179, { align: "center" });

      // Sello circular
      pdf.setDrawColor(gold); pdf.setLineWidth(0.8); pdf.circle(238, 168, 11, "S");
      pdf.setLineWidth(0.35); pdf.circle(238, 168, 8.5, "S");
      pdf.setTextColor(gold); pdf.setFont("helvetica", "bold"); pdf.setFontSize(5); pdf.text("SINDICATO", 238, 166.5, { align: "center" }); pdf.text("OPERARIOS", 238, 170.2, { align: "center" });
      pdf.setFontSize(4.2); pdf.text("FORMACIÓN", 238, 173.2, { align: "center" });

      // QR y verificación
      pdf.setDrawColor(navy); pdf.setLineWidth(0.6); pdf.roundedRect(258, 139, 27, 38, 2, 2, "S");
      pdf.addImage(qrDataUrl, "PNG", 260, 143, 23, 23);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "bold"); pdf.setFontSize(4.3); pdf.text("VERIFICACIÓN", 271.5, 171, { align: "center" });
      pdf.setFont("helvetica", "normal"); pdf.text("ESCANEA EL QR", 271.5, 174.5, { align: "center" });

      // Pie institucional
      pdf.setDrawColor(190, 194, 196); pdf.setLineWidth(0.25); pdf.line(24, 187, 273, 187);
      pdf.setTextColor(grey); pdf.setFont("helvetica", "normal"); pdf.setFontSize(5.3);
      pdf.text("Documento digital verificable mediante código QR. La formación y el test se realizan gratuitamente.", 24, 194);
      pdf.setFont("helvetica", "bold"); pdf.setTextColor(orange); pdf.text("SINDICATO DE OPERARIOS", 273, 194, { align: "right" });
      pdf.setFont("helvetica", "normal"); pdf.setTextColor(grey); pdf.setFontSize(4.8);
      pdf.text("Este certificado acredita la superación de la evaluación asociada a la formación indicada.", 24, 199.5);
      pdf.text("Código: " + certificateCode, 273, 199.5, { align: "right" });

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
        <p className="mt-4 text-sm leading-6 text-slate-300">{internalTest ? "Ruta interna de prueba: puedes simular el pago sin realizar ningún cobro y comprobar la descarga del certificado." : "Obtén tu certificado digital verificable tras superar el test y descárgalo una vez completes la certificación."}</p>
        <label className="mt-6 block text-sm font-bold text-white">Nombre y apellidos<input value={name} readOnly={paymentConfirmed && !internalTest} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellidos" autoComplete="name" type="text" className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white placeholder-slate-400 focus:border-safety focus:outline-none" /></label>
        <label className="mt-4 block text-sm font-bold text-white">Correo electrónico<input value={email} readOnly={paymentConfirmed && !internalTest} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white placeholder-slate-400 focus:border-safety focus:outline-none" /></label>
        {!paymentStarted ? (
          <button type="button" disabled={!canPreview || startingPayment} onClick={goToPayment} className="mt-5 w-full rounded-xl bg-safety px-5 py-4 text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed">
            {startingPayment ? "Preparando certificación..." : "CERTIFÍCATE"}
          </button>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-safety/30 bg-slate-950/60 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Certificado</p>
              <div className="mt-2 flex items-center justify-center gap-2 text-white">
                <span className="text-2xl" aria-hidden="true">💳</span>
                <span className="text-sm font-bold">Certificación segura con tarjeta</span>
              </div>
            </div>
            {internalTest ? <button type="button" onClick={simulateInternalPayment} className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy">Simular certificación</button> : (
              <form action={paymentUrl} method="get" target="_blank">
                <input type="hidden" name="codigo" value={certificateCode} />
                <button type="submit" className="block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400">
                  CERTIFÍCATE
                </button>
              </form>
            )}
            {!internalTest ? <button type="button" onClick={checkPayment} className="block w-full rounded-xl border-2 border-safety bg-transparent px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-safety hover:bg-safety/10">
              Comprobar certificación
            </button> : null}
          </div>
        )}
        {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
        <p className="mt-3 text-center text-xs leading-5 text-slate-400">La formación y el test son gratuitos. La certificación se completa de forma segura mediante tarjeta.</p>
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
