"use client";

import { useState } from "react";
import { Logo } from "./logo";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cursos", href: "#cursos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="hidden bg-navy text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a
              href="tel:+34900000000"
              className="flex items-center gap-2 transition-colors hover:text-safety"
            >
              <PhoneIcon /> 900 000 000
            </a>
            <a
              href="mailto:formacion@sindicatooperarios.es"
              className="flex items-center gap-2 transition-colors hover:text-safety"
            >
              <MailIcon /> formacion@sindicatooperarios.es
            </a>
          </div>
          <p className="font-medium tracking-wide">
            Formación homologada · Certificados oficiales
          </p>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-white/10 bg-navy-light/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#inicio" aria-label="Ir al inicio">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-safety"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="rounded-md bg-safety px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-safety-dark"
            >
              Inscríbete
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:bg-white/5 hover:text-safety"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-safety px-3 py-3 text-center text-sm font-bold uppercase tracking-wide text-navy"
            >
              Inscríbete
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m2 6 10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
