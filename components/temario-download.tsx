"use client";

import { Download } from "lucide-react";
import type { Course, Module } from "@/lib/courses";

export function TemarioDownload({ course, modules }: { course: Course; modules: Module[] }) {
  function download() {
    const lines: string[] = [];
    lines.push("SINDICATO DE OPERARIOS");
    lines.push("");
    lines.push(course.title);
    lines.push("TEMARIO COMPLETO");
    lines.push("");
    lines.push(course.description);
    lines.push("");
    modules.forEach((module, index) => {
      lines.push((index + 1) + ". " + module.title);
      lines.push(module.lesson.title);
      lines.push(module.lesson.intro);
      module.lesson.points.forEach((point) => lines.push("• " + point));
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "temario-" + course.id + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex items-center gap-2 rounded-lg border-2 border-safety bg-safety/10 px-5 py-3 text-sm font-black uppercase tracking-wide text-safety transition-colors hover:bg-safety hover:text-navy"
    >
      <Download className="h-5 w-5" />
      Descargar temario
    </button>
  );
}
