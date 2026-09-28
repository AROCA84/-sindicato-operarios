"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Formación", href: "/cursos" },
  { label: "Mi área", href: "/mi-area" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a href="https://wa.me/34642077425" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-safety">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href="mailto:sindicatooperarios@gmail.com" className="flex items-center gap-2 hover:text-safety">
              <MailIcon /> sindicatooperarios@gmail.com
            </a>
          </div>
          <p className="font-medium tracking-wide">Formación para operarios · Acceso desde móvil</p>
        </div>
      </div>

      <div className="border-b border-white/10 bg-navy-light/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" aria-label="Sindicato de Operarios - inicio" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`text-sm font-bold uppercase tracking-wide transition-colors ${active ? "text-safety" : "text-white/80 hover:text-safety"}`}>
                  {item.label}
                </Link>
              );
            })}
            <Link href="/afiliarse" className="rounded-lg bg-safety px-5 py-2.5 text-sm font-black uppercase tracking-wide text-navy hover:bg-safety-dark">
              Afíliate gratis
            </Link>
          </nav>

          <button type="button" onClick={() => setOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-white/10 px-4 py-3 md:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide text-white/85 hover:bg-white/5 hover:text-safety">
                  {item.label}
                </Link>
              ))}
              <Link href="/afiliarse" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-safety px-4 py-3 text-center text-sm font-black uppercase text-navy">
                Afíliate gratis
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function WhatsAppIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.05-.371-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
}
function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="m2 6 10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function MenuIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}
function CloseIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}
