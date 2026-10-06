"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, UserRound, UserPlus } from "lucide-react";

const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/cursos", label: "Formación", icon: BookOpen },
  { href: "/mi-area", label: "Mi área", icon: UserRound },
  { href: "/afiliarse", label: "Afíliate", icon: UserPlus },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-white/95 px-2 pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur md:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }} aria-label="Navegación principal">
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-[11px] font-black transition-colors ${active ? "bg-white/10 text-safety" : "text-white/55"}`} aria-current={active ? "page" : undefined}>
              <Icon className="h-5 w-5" />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
