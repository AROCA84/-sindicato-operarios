"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import QRCode from "qrcode";
import { courses } from "@/lib/courses";

type Member = { nombre: string; apellidos: string; email: string; numero_afiliado: number };

export default function MiAreaPage() {
  const [loaded, setLoaded] = useState(false);
  const [logged, setLogged] = useState(false);
  const [loginNombre, setLoginNombre] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [logging, setLogging] = useState(false);
  const [qr, setQr] = useState("");
  const [data, setData] = useState({ nombre: "", apellidos: "", email: "", numero: "" });
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [certificates, setCertificates] = useState<Array<{ codigo: string; curso_id: string; puntuacion: number; total: number; emitido_at: string | null }>>([]);

  function loadArea() {
    const ok = localStorage.getItem("sdo-afiliado") === "true";
    const nombre = localStorage.getItem("sdo-afiliado-nombre") || "";
    const apellidos = localStorage.getItem("sdo-afiliado-apellidos") || "";
    const email = localStorage.getItem("sdo-afiliado-email") || "";
    const numero = localStorage.getItem("sdo-numero-afiliado") || "";
    setData({ nombre, apellidos, email, numero });
    setLogged(ok && !!email && !!numero);
    if (ok && email && numero) {
      QRCode.toDataURL(window.location.origin + "/verificar?afiliado=" + encodeURIComponent(numero), { width: 220, margin: 2 }, (err, url) => { if (!err) setQr(url); });
      const saved: Record<string, number> = {};
      courses.forEach((c) => { saved[c.id] = Number(localStorage.getItem("sdo-progreso-" + c.id) || 0); });
      setProgress(saved);
      fetch("/api/mi-area/certificados", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, numero }) })
        .then((r) => r.ok ? r.json() : null).then((result) => { if (result?.ok) setCertificates(result.certificados || []); }).catch(() => undefined);
    }
    setLoaded(true);
  }

  useEffect(() => { loadArea(); }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    setLogging(true);
    try {
      const response = await fetch("/api/mi-area/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nombre: loginNombre, email: loginEmail }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "No se ha podido acceder.");
      const member = result.afiliado as Member;
      localStorage.setItem("sdo-afiliado", "true");
      localStorage.setItem("sdo-afiliado-nombre", member.nombre);
      localStorage.setItem("sdo-afiliado-apellidos", member.apellidos);
      localStorage.setItem("sdo-afiliado-email", member.email);
      localStorage.setItem("sdo-numero-afiliado", String(member.numero_afiliado));
      setLoginNombre("");
      setLoginEmail("");
      loadArea();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "No se ha podido acceder.");
    } finally { setLogging(false); }
  }

  if (!loaded) return <main className="min-h-screen bg-slate-50" />;

  if (!logged) return <main className="min-h-screen bg-navy px-5 py-10 text-white">
    <div className="mx-auto max-w-md">
      <Link href="/" className="font-bold text-safety">← Inicio</Link>
      <div className="mt-8 rounded-3xl bg-white p-7 text-navy shadow-2xl sm:p-9">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-xl font-black text-safety">SO</div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-safety-dark">Área del afiliado</p>
        <h1 className="mt-2 text-3xl font-black">Accede a Mi área</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Introduce tu nombre y el correo con el que te afiliaste.</p>
        <form onSubmit={login} className="mt-7 space-y-4">
          <div><label htmlFor="access-nombre" className="text-sm font-bold">Nombre</label><input id="access-nombre" required type="text" value={loginNombre} onChange={(e) => setLoginNombre(e.target.value)} autoComplete="given-name" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-safety" placeholder="Tu nombre" /></div>
          <div><label htmlFor="access-email" className="text-sm font-bold">Correo electrónico</label><input id="access-email" required type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-safety" placeholder="tu@email.com" /></div>
          {loginError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{loginError}</p>}
          <button disabled={logging} className="w-full rounded-xl bg-safety px-5 py-4 font-black disabled:opacity-60">{logging ? "Comprobando…" : "Entrar en Mi área"}</button>
        </form>
        <p className="mt-5 text-center text-xs text-slate-500">¿Todavía no eres afiliado? <Link href="/afiliarse?returnTo=/mi-area" className="font-black text-navy underline">Afíliate gratis</Link></p>
      </div>
    </div>
  </main>;

  const completed = Object.values(progress).filter((v) => v >= 100).length;
  const overall = Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / courses.length);

  return <main className="min-h-screen bg-slate-50 text-navy">
    <header className="bg-navy text-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href="/" className="font-black text-safety">SINDICATO DE OPERARIOS</Link><Link href="/cursos" className="text-sm font-bold text-white/80">Formación</Link></div></header>
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-safety-dark">Área del afiliado</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hola, {data.nombre}</h1><p className="mt-2 text-slate-600">Tus datos, identificación y progreso formativo.</p>
      <section className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <div className="rounded-2xl bg-navy p-6 text-white shadow-xl sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="flex-1"><p className="text-xs font-black uppercase tracking-widest text-safety">Afiliado activo</p><h2 className="mt-2 text-2xl font-black">{data.nombre} {data.apellidos}</h2><div className="mt-5 space-y-2 text-sm text-white/75"><p><b className="text-white">Nº afiliado:</b> {data.numero}</p><p><b className="text-white">Correo:</b> {data.email}</p><p><b className="text-white">Organización:</b> Sindicato de Operarios</p></div></div><div className="rounded-2xl bg-white p-3 text-center">{qr ? <img src={qr} alt="QR de verificación" className="h-40 w-40" /> : <div className="h-40 w-40 bg-slate-100" />}<p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-500">Verificación</p></div></div></div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-widest text-safety-dark">Tu progreso</p><p className="mt-2 text-4xl font-black">{completed}/{courses.length}</p><p className="text-sm text-slate-500">cursos completados</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-safety" style={{ width: overall + "%" }} /></div><p className="mt-2 text-right text-xs font-bold">{overall}% global</p></div>
      </section>
      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-black uppercase tracking-widest text-safety-dark">Mi formación</p><h2 className="mt-1 text-2xl font-black">Cursos y progreso</h2></div>
          <Link href="/cursos" className="text-sm font-black text-navy underline">Ver todos los cursos →</Link>
        </div>
        {(() => {
          const active = courses.filter((course) => (progress[course.id] || 0) > 0 && (progress[course.id] || 0) < 100);
          const next = active[0] || courses.find((course) => (progress[course.id] || 0) === 0);
          return next ? (
            <div className="mt-5 overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-lg sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img src={next.image} alt="" className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-36" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-safety">{active.length ? "Continúa donde lo dejaste" : "Empieza tu formación"}</p>
                  <h3 className="mt-1 text-lg font-black">{next.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{progress[next.id] || 0}% completado · Estudia gratis y realiza el test cuando estés preparado.</p>
                </div>
                <Link href={"/cursos/" + next.id} className="inline-flex shrink-0 justify-center rounded-xl bg-safety px-5 py-3 text-sm font-black text-navy">{progress[next.id] ? "Continuar" : "Empezar curso"}</Link>
              </div>
            </div>
          ) : null;
        })()}
        <div className="mt-5 grid gap-4 md:grid-cols-2">{courses.map((course) => { const value = progress[course.id] || 0; return <article key={course.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="flex gap-4"><img src={course.image} alt="" className="h-20 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase text-safety-dark">{course.category}</p><h3 className="mt-1 font-black leading-snug">{course.title}</h3></div></div><div className="mt-5 flex justify-between text-xs font-bold"><span>{value >= 100 ? "Completado" : value > 0 ? "En curso" : "Sin comenzar"}</span><span>{value}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-safety" style={{ width: value + "%" }} /></div><Link href={"/cursos/" + course.id} className="mt-4 inline-flex w-full justify-center rounded-lg border-2 border-navy px-4 py-2.5 text-sm font-black text-navy">{value >= 100 ? "Repasar curso" : value > 0 ? "Continuar formación" : "Ver curso"}</Link></article>; })}</div>
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-widest text-safety-dark">Identificación</p>
          <h2 className="mt-1 text-2xl font-black">🪪 Carné de afiliado</h2>
          <div className="mt-5 space-y-3 text-sm">
            <p><span className="font-bold">Estado:</span> Afiliado activo</p>
            <p><span className="font-bold">Nombre:</span> {data.nombre} {data.apellidos}</p>
            <p><span className="font-bold">Nº de afiliado:</span> {data.numero}</p>
            <p><span className="font-bold">Correo:</span> {data.email}</p>
            <p><span className="font-bold">Organización:</span> Sindicato de Operarios</p>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            El QR de tu carné permite comprobar que tu afiliación está activa.
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-widest text-safety-dark">Certificación</p>
          <h2 className="mt-1 text-2xl font-black">📜 Mis certificados</h2>
          {certificates.length > 0 ? (
            <div className="mt-5 space-y-3">
              {certificates.map((certificate) => {
                const course = courses.find((item) => item.id === certificate.curso_id);
                return (
                  <div key={certificate.codigo} className="rounded-xl border border-slate-200 p-4">
                    <p className="font-black">{course?.title || certificate.curso_id}</p>
                    <p className="mt-1 text-sm text-slate-500">APTO · {certificate.puntuacion}/{certificate.total} · Código {certificate.codigo}</p>
                    <Link href={"/verificar?codigo=" + encodeURIComponent(certificate.codigo)} className="mt-3 inline-flex rounded-lg bg-navy px-4 py-2.5 text-sm font-black text-white">
                      Ver certificado
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="font-bold">Todavía no tienes certificados emitidos.</p>
              <p className="mt-1 text-sm text-slate-500">Aprueba un test y, si quieres el certificado, completa el pago de 4,99 €.</p>
              <Link href="/cursos" className="mt-4 inline-flex rounded-lg bg-safety px-4 py-2.5 text-sm font-black text-navy">Ver formación</Link>
            </div>
          )}
        </div>
      </section>
      <button onClick={() => { localStorage.removeItem("sdo-afiliado"); window.location.reload(); }} className="mt-8 text-sm font-bold text-slate-500 underline">Cerrar sesión</button>
    </div>
  </main>;
}