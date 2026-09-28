"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Course, Module } from "@/lib/courses";

export function TemarioDownload({ course, modules }: { course: Course; modules: Module[] }) {
  const [showJoin, setShowJoin] = useState(false);

  function downloadPdf() {
    if (window.localStorage.getItem("sdo-afiliado") !== "true") {
      setShowJoin(true);
      return;
    }
    const moduleHtml = modules.map((module, index) =>
      "<section><h2>" + (index + 1) + ". " + module.title + "</h2><h3>" + module.lesson.title + "</h3><p>" + module.lesson.intro + "</p><ul>" +
      module.lesson.points.map((point) => "<li>" + point + "</li>").join("") + "</ul></section>"
    ).join("");
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write("<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\"><title>Temario - " + course.title + "</title><style>@page{size:A4;margin:18mm}body{font-family:Arial,sans-serif;color:#172033;line-height:1.55}header{border-bottom:4px solid #f5b400;padding-bottom:16px;margin-bottom:24px}h1{font-size:24px;margin:0 0 8px}h2{font-size:17px;margin-top:24px;border-bottom:1px solid #ddd;padding-bottom:6px}h3{font-size:14px}p,li{font-size:12px}li{margin:5px 0}.brand{font-weight:800;letter-spacing:1px;color:#d89000}.note{font-size:11px;color:#666}</style></head><body><header><div class=\"brand\">SINDICATO DE OPERARIOS</div><h1>" + course.title + "</h1><div class=\"note\">Temario completo · Formación gratuita · Afiliación gratuita</div></header>" + moduleHtml + "</body></html>");
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 350);
  }

  if (showJoin) {
    return (
      <div className="rounded-2xl border border-safety/30 bg-navy p-6 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 border-safety text-lg font-black text-safety">SO</div>
        <h3 className="mt-4 text-xl font-black text-white">Afíliate gratis para descargar el temario</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">Puedes consultar la formación gratis. Para descargar el temario completo, únete gratis al Sindicato y continúa tu formación a 0 €.</p>
        <a href={`/afiliarse?returnTo=${encodeURIComponent(window.location.pathname)}`} className="mt-5 inline-flex rounded-xl bg-safety px-6 py-3 text-sm font-black uppercase tracking-wide text-navy">Afiliarme gratis</a>
      </div>
    );
  }

  return (
    <button type="button" onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-lg border-2 border-safety bg-safety/10 px-5 py-3 text-sm font-black uppercase tracking-wide text-safety transition-colors hover:bg-safety hover:text-navy">
      <Download className="h-5 w-5" />
      Descargar temario en PDF
    </button>
  );
}
