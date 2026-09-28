"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { courses } from "@/lib/courses";

export default function MiAreaPage() {
  const [ready, setReady] = useState(false);
  const [qr, setQr] = useState("");
  const [data, setData] = useState({ nombre: "", apellidos: "", email: "", numero: "" });
  const [progress, setProgress] = useState<Record<string, number>>({});
  useEffect(() => {
    if (localStorage.getItem("sdo-afiliado") !== "true") return;
    const nombre = localStorage.getItem("sdo-afiliado-nombre") || localStorage.getItem("sdo-nombre") || "";
    const apellidos = localStorage.getItem("sdo-afiliado-apellidos") || "";
    const email = localStorage.getItem("sdo-afiliado-email") || localStorage.getItem("sdo-email") || "";
    const numero = localStorage.getItem("sdo-numero-afiliado") || "";
    setData({ nombre, apellidos, email, numero });
    QRCode.toDataURL(window.location.origin + "/verificar?afiliado=" + encodeURIComponent(numero), { width: 220, margin: 2 }, (err, url) => { if (!err) setQr(url); });
    const saved: Record<string, number> = {};
    courses.forEach((c) => { saved[c.id] = Number(localStorage.getItem("sdo-progreso-" + c.id) || 0); });
    setProgress(saved); setReady(true);
  }, []);
  if (!ready) return <main className="min-h-screen bg-slate-50" />;
  if (!data.email) return <main className="min-h-screen bg-slate-50 px-6 py-16 text-center text-navy"><h1 className="text-3xl font-black">Mi área</h1><p className="mx-auto mt-3 max-w-md text-slate-600">Afíliate gratis para acceder a tu área personal.</p><Link href="/afiliarse?returnTo=/mi-area" className="mt-6 inline-flex rounded-xl bg-safety px-6 py-3 font-black">Afiliarme gratis</Link></main>;
  const completed = Object.values(progress).filter((v) => v >= 100).length;
  const overall = Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / courses.length);
  return <main className="min-h-screen bg-slate-50 text-navy">
    <header className="bg-navy text-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href="/" className="font-black text-safety">SINDICATO DE OPERARIOS</Link><Link href="/cursos" className="text-sm font-bold text-white/80">Formación</Link></div></header>
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10"><p className="text-xs font-black uppercase tracking-[0.2em] text-safety-dark">Área del afiliado</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hola, {data.nombre}</h1><p className="mt-2 text-slate-600">Tus datos, identificación y progreso formativo.</p>
      <section className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <div className="rounded-2xl bg-navy p-6 text-white shadow-xl sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="flex-1"><p className="text-xs font-black uppercase tracking-widest text-safety">Afiliado activo</p><h2 className="mt-2 text-2xl font-black">{data.nombre} {data.apellidos}</h2><div className="mt-5 space-y-2 text-sm text-white/75"><p><b className="text-white">Nº afiliado:</b> {data.numero || "Pendiente"}</p><p><b className="text-white">Correo:</b> {data.email}</p><p><b className="text-white">Organización:</b> Sindicato de Operarios</p></div></div><div className="rounded-2xl bg-white p-3 text-center">{qr ? <img src={qr} alt="QR de verificación" className="h-40 w-40" /> : <div className="h-40 w-40 bg-slate-100" />}<p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-500">Verificación</p></div></div></div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-widest text-safety-dark">Tu progreso</p><p className="mt-2 text-4xl font-black">{completed}/{courses.length}</p><p className="text-sm text-slate-500">cursos completados</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-safety" style={{ width: overall + "%" }} /></div><p className="mt-2 text-right text-xs font-bold">{overall}% global</p></div>
      </section>
      <section className="mt-8"><p className="text-xs font-black uppercase tracking-widest text-safety-dark">Mi formación</p><h2 className="mt-1 text-2xl font-black">Cursos y progreso</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{courses.map((course) => { const value = progress[course.id] || 0; return <article key={course.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="flex gap-4"><img src={course.image} alt="" className="h-20 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase text-safety-dark">{course.category}</p><h3 className="mt-1 font-black leading-snug">{course.title}</h3></div></div><div className="mt-5 flex justify-between text-xs font-bold"><span>{value >= 100 ? "Completado" : value > 0 ? "En curso" : "Sin comenzar"}</span><span>{value}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-safety" style={{ width: value + "%" }} /></div><Link href={"/cursos/" + course.id} className="mt-4 inline-flex w-full justify-center rounded-lg border-2 border-navy px-4 py-2.5 text-sm font-black text-navy">{value >= 100 ? "Repasar curso" : "Continuar formación"}</Link></article>; })}</div></section>
    </div></main>;
}