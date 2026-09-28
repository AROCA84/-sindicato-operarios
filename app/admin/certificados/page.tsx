"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Download, Eye, Mail, ShieldCheck } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const courseTitle = "Operario de Carretillas Elevadoras, Frontales y Retráctiles";
const unionName = "Sindicato de Operarios";
const unionEmail = "sindicatooperarios@gmail.com";

function generateAffiliateNumber() {
  return "SO-" + String(Math.floor(100000 + Math.random() * 900000));
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 ${dark ? "border-safety bg-slate-950 text-safety" : "border-slate-900 bg-slate-900 text-safety"} font-black text-sm shadow-lg`}>
      <span>S<span className="text-white">O</span></span>
    </div>
  );
}

function InstitutionalMark({ label }: { label: string }) {
  return <div className="flex h-10 min-w-[92px] items-center justify-center rounded border border-slate-400/70 bg-white/70 px-2 text-center text-[7px] font-black uppercase leading-tight tracking-wide text-slate-600">{label}</div>;
}

async function downloadElementAsPdf(element: HTMLElement, filename: string, widthMm: number, heightMm: number) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
    imageTimeout: 15000,
  });
  const pdf = new jsPDF({ orientation: widthMm >= heightMm ? "landscape" : "portrait", unit: "mm", format: [widthMm, heightMm], compress: true });
  const image = canvas.toDataURL("image/jpeg", 0.96);
  pdf.addImage(image, "JPEG", 0, 0, widthMm, heightMm, undefined, "FAST");
  pdf.save(filename);
}

export default function AdminCertificadosPage() {
  const [studentName, setStudentName] = useState("Nombre y Apellidos");
  const [studentEmail, setStudentEmail] = useState("alumno@ejemplo.com");
  const [busy, setBusy] = useState<string | null>(null);
  const affiliationNumber = useMemo(generateAffiliateNumber, []);

  const verificationUrl = typeof window !== "undefined" ? window.location.origin + "/verificar/" + affiliationNumber : "/verificar/" + affiliationNumber;
  const qrUrl = QRCode.toDataURL(verificationUrl, { width: 240, margin: 1, errorCorrectionLevel: "H" });

  async function downloadPdf(kind: "card" | "certificate") {
    const id = kind === "card" ? "pdf-card" : "pdf-certificate";
    const element = document.getElementById(id);
    if (!element) return;
    setBusy(kind);
    try {
      const dataUrl = await qrUrl;
      element.querySelectorAll("img[data-qr]").forEach((img) => { (img as HTMLImageElement).src = dataUrl; });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await downloadElementAsPdf(element, kind === "card" ? `carnet-${affiliationNumber}.pdf` : `certificado-${affiliationNumber}.pdf`, kind === "card" ? 85.6 : 297, kind === "card" ? 53.98 : 210);
    } catch (error) {
      console.error(error);
      alert("No se ha podido generar el PDF. Vuelve a intentarlo.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-safety/20 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-safety">Administración</p><h1 className="mt-2 text-3xl font-black">Certificados profesionales</h1><p className="mt-2 text-sm text-slate-300">Previsualización y descarga directa en PDF de alta calidad.</p></div>
          <a href="/" className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold hover:bg-white/10">← Volver a la web</a>
        </div>

        <section className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
          <label className="block text-sm font-bold">Nombre y apellidos<input value={studentName} onChange={(e) => setStudentName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety" /></label>
          <label className="block text-sm font-bold">Correo electrónico<input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-safety" /></label>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 text-xs text-slate-300"><span className="rounded-lg bg-safety/10 px-3 py-2 font-black text-safety">AFILIACIÓN · {affiliationNumber}</span><span>El número se genera automáticamente para esta certificación.</span></div>
        </section>

        <div className="space-y-10">
          <section>
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2"><Eye className="h-5 w-5 text-safety" /><h2 className="text-xl font-black">Carné de aptitud · PVC horizontal</h2></div>
              <button type="button" disabled={busy !== null} onClick={() => downloadPdf("card")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-safety px-4 py-3 text-sm font-black uppercase tracking-wide text-navy hover:bg-safety-dark disabled:opacity-50"><Download className="h-4 w-4" />{busy === "card" ? "Generando PDF…" : "Descargar PDF"}</button>
            </div>

            <div id="pdf-card" className="relative mx-auto aspect-[1.586/1] max-w-4xl overflow-hidden rounded-2xl border border-safety/40 bg-slate-950 p-5 text-white shadow-2xl sm:p-7" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(250,180,35,.18) 0 2px, transparent 3px), linear-gradient(135deg, transparent 0 45%, rgba(255,255,255,.035) 45% 46%, transparent 46% 100%), repeating-linear-gradient(25deg, rgba(255,255,255,.025) 0 1px, transparent 1px 9px)" }}>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-safety/20" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-white/40 bg-white/10 text-center text-[9px] font-black uppercase text-slate-300">Foto</div><div className="flex items-center gap-2"><BrandMark dark /><div><p className="text-[11px] font-black uppercase tracking-[0.16em] text-safety">{unionName}</p><p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Formación y certificación profesional</p></div></div></div><div className="rounded-lg border border-safety/40 bg-safety/10 px-3 py-2 text-right"><span className="block text-[8px] font-black uppercase tracking-widest text-safety">Estado</span><span className="text-lg font-black">APTO ✓</span></div></div>
                <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-5"><div className="min-w-0"><p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">Titular</p><p className="mt-1 truncate text-xl font-black uppercase sm:text-2xl">{studentName || "Nombre y Apellidos"}</p><p className="mt-3 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">Formación acreditada</p><p className="mt-1 max-w-xl text-sm font-bold leading-5 text-slate-100">{courseTitle}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold">AFILIACIÓN · {affiliationNumber}</span><span className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold"><Mail className="h-3 w-3" /> {studentEmail || unionEmail}</span></div></div><div className="rounded-xl bg-white p-2 text-slate-950 shadow-xl"><img data-qr src={qrUrl} alt="QR de verificación" className="h-20 w-20" /><p className="mt-1 text-center text-[7px] font-black uppercase">Verificación</p></div></div>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">PDF exacto: 85,60 × 53,98 mm · formato PVC/tarjeta bancaria · horizontal.</p>
          </section>

          <section>
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-safety" /><h2 className="text-xl font-black">Certificado de aptitud · A4 horizontal</h2></div><button type="button" disabled={busy !== null} onClick={() => downloadPdf("certificate")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-safety px-4 py-3 text-sm font-black uppercase tracking-wide text-navy hover:bg-safety-dark disabled:opacity-50"><Download className="h-4 w-4" />{busy === "certificate" ? "Generando PDF…" : "Descargar PDF"}</button></div>
            <div id="pdf-certificate" className="relative mx-auto aspect-[1.414/1] max-w-5xl overflow-hidden rounded-xl border-4 border-[#8f6c18] bg-[#d5b45a] p-3 text-slate-900 shadow-2xl sm:p-5" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,.22) 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, rgba(80,55,10,.08) 0 1px, transparent 2px), repeating-linear-gradient(45deg, rgba(120,90,20,.055) 0 2px, transparent 2px 12px)" }}>
              <div className="relative h-full rounded-lg border-2 border-[#8a6615] bg-[#ead17d]/55 p-4 sm:p-6"><div className="flex items-start justify-between gap-4 border-b-2 border-[#8a6615]/60 pb-3"><div className="flex items-center gap-3"><BrandMark /><div><p className="text-sm font-black uppercase tracking-[0.2em]">{unionName}</p><p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">Certificación de aptitudes profesionales</p></div></div><div className="hidden gap-2 sm:flex"><InstitutionalMark label="Sindicato" /><InstitutionalMark label="Certificación" /></div></div><div className="flex h-[calc(100%-72px)] flex-col justify-center text-center"><p className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-600">Certificado de aptitud</p><p className="mt-3 text-xs font-bold text-slate-600">Se certifica que</p><h3 className="mx-auto mt-1 max-w-[78%] break-words text-2xl font-black uppercase leading-tight tracking-wide sm:text-3xl">{studentName || "Nombre y Apellidos"}</h3><div className="mx-auto mt-3 h-1 w-28 rounded-full bg-[#8a6615]" /><p className="mt-4 text-xs text-slate-700">ha superado satisfactoriamente la formación:</p><p className="mx-auto mt-2 max-w-3xl text-base font-black leading-tight sm:text-xl">{courseTitle}</p><div className="mt-4 flex flex-wrap justify-center gap-2"><span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-1 text-[9px] font-black uppercase">APTO · 18/20</span><span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-1 text-[9px] font-black uppercase">AFILIACIÓN · {affiliationNumber}</span></div></div><div className="absolute bottom-4 left-5 right-5 flex items-end justify-between border-t border-[#8a6615]/50 pt-2 sm:bottom-6 sm:left-6 sm:right-6"><div><p className="font-serif text-lg">{unionName}</p><p className="flex items-center gap-1 text-[8px] font-bold text-slate-600"><Mail className="h-3 w-3" /> {studentEmail || unionEmail}</p></div><div className="flex items-center gap-4"><div className="text-center"><img data-qr src={qrUrl} alt="QR de verificación" className="h-12 w-12" /><p className="text-[7px] font-black uppercase">Verificación</p></div><CheckCircle2 className="h-9 w-9 text-[#6f5410]" /></div></div></div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">PDF exacto: A4 horizontal · 297 × 210 mm · descarga directa, sin depender del diálogo de impresión del navegador.</p>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-safety/20 bg-safety/10 p-5 text-sm text-slate-200"><strong className="text-white">Descarga mejorada:</strong> el sitio genera el PDF directamente en el navegador, con tamaño físico exacto y el QR incrustado. Esto evita el PDF vacío o cortado que producía la impresión del navegador.</div>
      </div>
    </main>
  );
}
