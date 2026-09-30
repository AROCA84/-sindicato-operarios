"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Course, Module } from "@/lib/courses";

export function TemarioDownload({ course, modules }: { course: Course; modules: Module[] }) {
  const [showJoin, setShowJoin] = useState(false);

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function downloadPdf() {
    if (window.localStorage.getItem("sdo-afiliado") !== "true") {
      setShowJoin(true);
      return;
    }

    const moduleHtml = modules.map((module, index) => `
      <section class="module">
        <div class="module-number">TEMA ${index + 1}</div>
        <h2>${escapeHtml(module.title)}</h2>
        <h3>${escapeHtml(module.lesson.title)}</h3>
        <p class="intro">${escapeHtml(module.lesson.intro)}</p>
        <h4>Desarrollo completo del tema</h4>
        ${module.lesson.sections?.length ? module.lesson.sections.map((section) => `
          <div class="section-block">
            <h4>${escapeHtml(section.heading)}</h4>
            <p>${escapeHtml(section.text)}</p>
            ${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}
          </div>
        `).join("") : `
          <ul>${module.lesson.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        `}
        <div class="study-note">
          <strong>Objetivo de estudio</strong>
          <p>Lee y comprende todos los puntos de este tema antes de pasar al siguiente. El test final incluirá preguntas relacionadas con los contenidos de esta formación.</p>
        </div>
      </section>
    `).join("");

    const contents = modules.map((module, index) => `
      <li><strong>Tema ${index + 1}:</strong> ${escapeHtml(module.title)}</li>
    `).join("");

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Curso - ${escapeHtml(course.title)}</title>
<style>
  @page { size: A4; margin: 16mm 17mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #172033; line-height: 1.6; margin: 0; }
  .cover { min-height: 250mm; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
  .brand { font-weight: 800; letter-spacing: 2px; color: #d89000; font-size: 13px; border-bottom: 4px solid #f5b400; padding-bottom: 14px; margin-bottom: 28px; }
  .cover h1 { font-size: 28px; line-height: 1.2; margin: 0 0 16px; }
  .cover .description { font-size: 15px; color: #555; }
  .badge { display: inline-block; margin-top: 24px; padding: 8px 12px; background: #f8f1d8; border: 1px solid #e4c95a; font-weight: 700; font-size: 11px; }
  .contents { page-break-after: always; }
  .contents h2 { font-size: 22px; border-bottom: 2px solid #ddd; padding-bottom: 8px; }
  .contents li { margin: 10px 0; font-size: 13px; }
  .module { page-break-before: always; }
  .module:first-of-type { page-break-before: auto; }
  .module-number { display: inline-block; padding: 6px 10px; background: #f5b400; color: #172033; font-size: 11px; font-weight: 800; letter-spacing: 1px; border-radius: 4px; }
  .module h2 { font-size: 22px; line-height: 1.25; margin: 14px 0 8px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
  .module h3 { font-size: 16px; margin: 18px 0 8px; }
  .module h4 { font-size: 13px; margin: 24px 0 8px; text-transform: uppercase; letter-spacing: .5px; }
  .intro { font-size: 13px; color: #555; }
  .module ul { padding-left: 22px; }
  .module li { font-size: 12.5px; margin: 7px 0; }\n  .section-block { margin-top: 22px; }\n  .section-block h4 { margin: 0 0 6px; font-size: 13px; }\n  .section-block p { font-size: 12.5px; margin: 0 0 7px; }\n  .references { margin-top: 24px; padding: 12px 14px; background: #f5f6f7; border: 1px solid #ddd; font-size: 10px; }\n  .references p { margin: 5px 0; }
  .study-note { margin-top: 28px; padding: 14px 16px; background: #f5f6f7; border-left: 4px solid #f5b400; font-size: 11px; }
  .study-note p { margin: 5px 0 0; }
  .footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; color: #777; font-size: 9px; }
</style>
</head>
<body>
  <section class="cover">
    <div class="brand">SINDICATO DE OPERARIOS</div>
    <h1>${escapeHtml(course.title)}</h1>
    <p class="description">${escapeHtml(course.description)}</p>
    <span class="badge">FORMACIÓN GRATUITA · TEMARIO COMPLETO</span>
  </section>

  <section class="contents">
    <h2>Contenido del curso</h2>
    <p>Este documento contiene el desarrollo de los temas de la formación.</p>
    <ol>${contents}</ol>
  </section>

  ${moduleHtml}

  <div class="footer">Sindicato de Operarios · Formación gratuita · Documento de estudio</div>
</body>
</html>`);
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
