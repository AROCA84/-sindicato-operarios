"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const COURSE_TITLE = "Operario de Carretillas Elevadoras, Frontales y Retráctiles";

export default function PruebaCertificacionPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    if (window.location.search !== "?prueba=1") {
      router.replace("/prueba-certificacion?prueba=1");
      return;
    }
    setReady(true);
  }, [router]);

  async function downloadDemoPdf() {
    if (generatingPdf) return;
    setGeneratingPdf(true);
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const qr = await QRCode.toDataURL("DEMO SINDICATO DE OPERARIOS - SIN VALIDEZ ACREDITATIVA", {
        width: 300, margin: 1, errorCorrectionLevel: "M",
      });
      const navy: [number, number, number] = [17, 26, 34];
      const gold: [number, number, number] = [217, 154, 0];
      const cream: [number, number, number] = [247, 243, 234];

      // Página 1: certificado A4 apaisado.
      pdf.setFillColor(...cream); pdf.rect(0, 0, 297, 210, "F");
      pdf.setFillColor(...navy); pdf.rect(0, 0, 9, 210, "F");
      pdf.setFillColor(...gold); pdf.rect(9, 0, 2, 210, "F");
      pdf.setDrawColor(...navy); pdf.setLineWidth(0.8); pdf.rect(17, 12, 263, 186);
      pdf.setDrawColor(...gold); pdf.setLineWidth(0.4); pdf.rect(21, 16, 255, 178);
      pdf.setFillColor(...navy); pdf.roundedRect(26, 22, 245, 29, 2, 2, "F");
      pdf.setFillColor(...gold); pdf.circle(41, 36.5, 8, "F");
      pdf.setTextColor(...navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10);
      pdf.text("SO", 41, 40, { align: "center" });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(13);
      pdf.text("SINDICATO DE OPERARIOS", 55, 36);
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(6.5);
      pdf.text("VISTA PREVIA DE FORMACIÓN · DOCUMENTO DE DEMOSTRACIÓN", 55, 43);
      pdf.setTextColor(...navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(24);
      pdf.text("CERTIFICADO", 148.5, 69, { align: "center" });
      pdf.setTextColor(...gold); pdf.setFontSize(8);
      pdf.text("DE FORMACIÓN Y APTITUD · MUESTRA", 148.5, 77, { align: "center" });
      pdf.setDrawColor(...gold); pdf.line(104, 82, 193, 82);
      pdf.setTextColor(90, 98, 104); pdf.setFontSize(7);
      pdf.text("TITULAR DE EJEMPLO", 148.5, 95, { align: "center" });
      pdf.setTextColor(...navy); pdf.setFont("times", "italic"); pdf.setFontSize(22);
      pdf.text("Nombre y Apellidos", 148.5, 107, { align: "center" });
      pdf.setFillColor(239, 232, 216); pdf.roundedRect(42, 117, 213, 29, 2, 2, "F");
      pdf.setTextColor(90, 98, 104); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6.5);
      pdf.text("FORMACIÓN DE MUESTRA", 148.5, 125, { align: "center" });
      pdf.setTextColor(...navy); pdf.setFontSize(11);
      pdf.text("Operario de Carretillas Elevadoras, Frontales y Retráctiles", 148.5, 136, { align: "center", maxWidth: 200 });
      pdf.setFillColor(...gold); pdf.roundedRect(42, 154, 47, 23, 2, 2, "F");
      pdf.setTextColor(...navy); pdf.setFontSize(7); pdf.text("ESTADO", 65.5, 162, { align: "center" });
      pdf.setFontSize(11); pdf.text("DEMO", 65.5, 171, { align: "center" });
      pdf.addImage(qr, "PNG", 249, 151, 23, 23);
      pdf.setTextColor(80, 80, 80); pdf.setFontSize(6);
      pdf.text("QR DE DEMOSTRACIÓN", 260.5, 179, { align: "center" });
      pdf.setDrawColor(180, 180, 180); pdf.line(26, 185, 271, 185);
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(7); pdf.setTextColor(170, 45, 30);
      pdf.text("MUESTRA SIN VALIDEZ ACREDITATIVA · NO ES UN CERTIFICADO REAL", 148.5, 191, { align: "center" });

      // Página 2: carné PVC horizontal en proporción 85,6 × 54 mm.
      pdf.addPage([85.6, 54], "landscape");
      pdf.setFillColor(...navy); pdf.rect(0, 0, 85.6, 54, "F");
      pdf.setDrawColor(...gold); pdf.setLineWidth(0.7); pdf.roundedRect(2, 2, 81.6, 50, 2, 2, "S");
      pdf.setFillColor(...gold); pdf.circle(10, 10, 4.5, "F");
      pdf.setTextColor(...navy); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6);
      pdf.text("SO", 10, 12, { align: "center" });
      pdf.setTextColor(...gold); pdf.setFontSize(6.5);
      pdf.text("SINDICATO DE OPERARIOS", 17, 9);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(4);
      pdf.text("CARNÉ DE MUESTRA · NO OFICIAL", 17, 13);
      pdf.setFontSize(8); pdf.setFont("helvetica", "bold");
      pdf.text("Nombre y Apellidos", 6, 25);
      pdf.setFontSize(5); pdf.setFont("helvetica", "normal");
      pdf.text("Operario de Carretillas Elevadoras", 6, 31);
      pdf.text("Frontales y Retráctiles", 6, 35);
      pdf.setTextColor(...gold); pdf.setFont("helvetica", "bold"); pdf.setFontSize(6);
      pdf.text("APTO · DEMO", 6, 43);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(4.5);
      pdf.text("CÓDIGO: DEMO-001 · SIN VALIDEZ", 6, 48);
      pdf.addImage(qr, "PNG", 66, 30, 13, 13);
      pdf.setFontSize(3.2); pdf.text("QR DEMO", 72.5, 45, { align: "center" });

      pdf.save("Vista-previa-Sindicato-de-Operarios-DEMO.pdf");
    } catch (error) {
      console.error("No se pudo generar el PDF de demostración", error);
      window.alert("No se pudo generar el PDF. Recarga la página y vuelve a intentarlo.");
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-safety/30 bg-safety/10 p-5 sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">ENTORNO DE PRUEBA · SIN COBRO</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Vista previa del certificado y el carné</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Documentos de demostración para revisar el diseño. No se realiza ningún pago ni se emite una acreditación oficial.
          </p>
        </header>

        <section className="mb-8 overflow-hidden rounded-2xl border border-safety/40 bg-slate-950 p-4 shadow-2xl sm:p-7">
          <div className="relative overflow-hidden rounded-xl border-2 border-safety/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-safety/20" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-safety bg-slate-950 text-lg font-black text-safety sm:h-16 sm:w-16">SO</div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-safety">Sindicato de Operarios</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Formación y aptitud profesional</p>
                </div>
              </div>
              <div className="self-start rounded-lg border border-safety/50 bg-safety/10 px-4 py-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-safety">Estado de muestra</p>
                <p className="text-xl font-black text-white">APTO · DEMO</p>
              </div>
            </div>
            <div className="relative mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Titular de ejemplo</p>
                <h2 className="mt-1 break-words text-xl font-black uppercase text-white sm:text-3xl">Nombre y Apellidos</h2>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Formación de muestra</p>
                <p className="mt-1 max-w-2xl text-sm font-bold leading-6 text-white sm:text-base">{COURSE_TITLE}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold">
                  <span className="rounded-md bg-white/10 px-3 py-2 text-slate-200">AFILIACIÓN · DEMO-001</span>
                  <span className="rounded-md bg-white/10 px-3 py-2 text-slate-200">NO VÁLIDO COMO ACREDITACIÓN</span>
                </div>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-white/20 bg-white p-2 text-center text-[9px] font-black uppercase text-slate-500">
                QR DE<br />DEMOSTRACIÓN
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-black">1. Carné de aptitud · formato PVC horizontal</h2>
            <p className="text-xs text-slate-400">Proporción de tarjeta bancaria · vista previa</p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-safety/40 bg-[#f7f3e8] p-3 text-slate-900 shadow-2xl sm:p-5">
          <div className="rounded-xl border-2 border-[#8a6615] bg-[#ead17d] p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b-2 border-[#8a6615]/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-900 font-black text-safety">SO</div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em]">Sindicato de Operarios</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-600">Certificación de aptitudes profesionales</p>
                </div>
              </div>
              <span className="rounded border border-[#8a6615] bg-white/30 px-3 py-2 text-[10px] font-black uppercase">Documento de muestra</span>
            </div>
            <div className="py-8 text-center sm:py-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Certificado de formación y aptitud</p>
              <p className="mt-4 text-xs font-bold text-slate-600">Se certifica, a modo de ejemplo, que</p>
              <h2 className="mt-2 break-words text-2xl font-black uppercase sm:text-4xl">Nombre y Apellidos</h2>
              <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-[#8a6615]" />
              <p className="mt-5 text-xs text-slate-700">ha superado la formación de muestra:</p>
              <p className="mx-auto mt-2 max-w-3xl text-base font-black leading-snug sm:text-xl">{COURSE_TITLE}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-2 text-[10px] font-black uppercase">APTO · 18/20 · DEMO</span>
                <span className="rounded border border-[#8a6615]/50 bg-white/30 px-3 py-2 text-[10px] font-black uppercase">CÓDIGO · DEMO-001</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-[#8a6615]/50 pt-4 text-xs sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-serif text-lg">Sindicato de Operarios</p>
                <p className="mt-1 text-[10px] text-slate-600">Vista previa no oficial · Sin validez acreditativa</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center border border-slate-500 bg-white text-center text-[8px] font-black text-slate-500">QR<br />DEMO</div>
                <div className="text-[9px] font-black uppercase text-slate-600">Verificación<br />de muestra</div>
              </div>
            </div>
          </div>
          <h2 className="mt-3 text-lg font-black">2. Certificado · A4 horizontal</h2>
        </section>

        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          Estas son maquetas visuales con datos ficticios. El QR y los códigos son marcadores de demostración; no verifican una certificación real.
        </div>

        <button type="button" onClick={downloadDemoPdf} disabled={!ready || generatingPdf} className="mb-3 block w-full rounded-xl bg-safety px-5 py-4 text-center text-sm font-black uppercase tracking-wide text-navy hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-60">
          {generatingPdf ? "Generando PDF..." : "Descargar PDF de muestra (certificado + carné)"}
        </button>
        <Link href="/" className="block rounded-xl border border-white/20 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10">Volver a la web</Link>
      </div>
    </main>
  );
}
