"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courses, categories, type Category } from "@/lib/courses";

const categoryIcons: Record<Category, CategoryIconName> = {
  "Manutención y Carretillas": "forklift",
  "Elevación y Plataformas": "platform",
  "Grúas y Equipos de Elevación": "crane",
  "Maquinaria y Movimiento de Tierras": "excavator",
  "Logística y Almacén": "warehouse",
  "Prevención de Riesgos Laborales": "safety",
  "Manipulación y Seguridad": "shield",
};

type CategoryIconName = "forklift" | "platform" | "crane" | "excavator" | "warehouse" | "safety" | "shield";

const categoryDescriptions: Record<Category, string> = {
  "Manutención y Carretillas": "Carretillas, transpaletas y equipos de manutención.",
  "Elevación y Plataformas": "PEMP y trabajos seguros en altura.",
  "Grúas y Equipos de Elevación": "Puente grúa, camión pluma y accesorios de elevación.",
  "Maquinaria y Movimiento de Tierras": "Dúmper, retropala, telescópica y maquinaria de obra.",
  "Logística y Almacén": "Organización, stock, pedidos y operaciones de almacén.",
  "Prevención de Riesgos Laborales": "Formación preventiva aplicada al trabajo.",
  "Manipulación y Seguridad": "Cargas, ergonomía, EPI y seguridad del operario.",
};

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<Category | null>(null);
  const [affiliated, setAffiliated] = useState(false);

  useEffect(() => {
    setAffiliated(window.localStorage.getItem("sdo-afiliado") === "true");
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const toggleCategory = (category: Category) => {
    setOpenCategory((current) => (current === category ? null : category));
  };

  return (
    <section id="cursos" className="bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-safety-dark">
            Catálogo formativo
          </span>
          <h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">
            Cursos de formación
          </h2>
          <p className="mt-4 text-slate-600">
            Estudia gratis, realiza el test gratis y, si apruebas, podrás continuar con el proceso para obtener tu certificado.
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar cursos..."
              aria-label="Buscar cursos"
              className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base text-navy shadow-sm outline-none transition focus:border-safety focus:ring-2 focus:ring-safety/30"
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-600">
            <span aria-hidden="true">●</span>
            <span>{courses.length} cursos disponibles</span>
            <span>·</span>
            <span>Formación gratuita</span>
          </div>
        </div>

        {normalizedQuery ? (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-navy">Resultados de búsqueda</h3>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm font-bold text-safety-dark underline"
              >
                Limpiar
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((course) => (
                  <CourseRow key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-white p-6 text-center text-slate-500 ring-1 ring-slate-200">
                No se han encontrado cursos que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            <h3 className="mb-4 text-2xl font-black text-navy">Categorías de formación</h3>

            {categories.map((category) => {
              const isOpen = openCategory === category;
              const categoryCourses = courses.filter((course) => course.category === category);

              return (
                <div key={category} className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 px-5 py-6 text-left transition-all duration-200 hover:bg-slate-50 sm:px-7 sm:py-7"
                  >
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-100 text-safety-dark shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md sm:h-20 sm:w-20" aria-hidden="true">
                      <IndustrialIcon name={categoryIcons[category]} large />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-black uppercase tracking-[0.02em] text-navy sm:text-xl">
                        {category}
                      </span>
                      <span className="mt-1.5 block text-sm font-medium text-slate-500 sm:text-base">
                        {categoryCourses.length > 0
                          ? `${categoryCourses.length} ${categoryCourses.length === 1 ? "curso" : "cursos"}`
                          : "Nuevas formaciones próximamente"}
                      </span>
                    </span>
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-3xl font-light leading-none text-safety transition-all duration-200 group-hover:border-safety/50 group-hover:bg-safety/10 ${isOpen ? "rotate-90 bg-safety/10" : ""}`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/70 p-3 sm:p-4">
                      {categoryCourses.length > 0 ? (
                        <div className="space-y-3">
                          {categoryCourses.map((course) => (
                            <CourseRow key={course.id} course={course} />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed border-safety/50 bg-white p-5 text-center">
                          <p className="font-bold text-navy">Próximamente</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Estamos preparando nuevas formaciones para esta categoría.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 rounded-xl border-2 border-safety bg-navy p-5 text-white">
              <p className="flex items-center gap-2 text-lg font-black"><span className="flex h-8 w-8 items-center justify-center rounded-md border border-safety/40 bg-safety/10 text-safety"><IndustrialIcon name="safety" /></span> Próximamente</p>
              <p className="mt-1 text-sm text-white/70">
                Seguimos ampliando el catálogo con nuevas formaciones y especialidades profesionales.
              </p>
            </div>
          </div>
        )}

        {!affiliated && (
          <div className="mt-8 text-center">
            <Link
              href="/afiliarse"
              className="inline-flex rounded-lg bg-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Afiliarme gratis
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function CourseRow({ course }: { course: (typeof courses)[number] }) {
  return (
    <article className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-4">
      <div className="hidden h-16 w-20 shrink-0 overflow-hidden rounded-lg sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.image || "/placeholder.svg"}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold leading-snug text-navy sm:text-base">
          <Link href={`/cursos/${course.id}`} className="hover:text-safety-dark">
            {course.title}
          </Link>
        </h4>
        <p className="mt-1 hidden text-xs text-slate-500 sm:block">{course.description}</p>
        <span className="mt-2 inline-flex rounded-full bg-safety/20 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-navy">
          Estudiar gratis
        </span>
      </div>

      <Link
        href={`/cursos/${course.id}`}
        aria-label={`Abrir ${course.title}`}
        className="shrink-0 text-2xl font-light text-safety"
      >
        ›
      </Link>
    </article>
  );
}

function IndustrialIcon({ name, large = false }: { name: CategoryIconName; large?: boolean }) {
  const size = large ? 42 : 24;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "forklift":
      return <svg {...common}><path d="M8 34V18h13l7 12h12v8H8Z" /><path d="M21 18v12M27 30l-6-12M35 16v14M39 16h4M35 16v-5" /><path d="M12 38v4M36 38v4M7 42h8M33 42h8" /><circle cx="12" cy="37" r="4" /><circle cx="36" cy="37" r="4" /></svg>;
    case "platform":
      return <svg {...common}><path d="M9 39h30M12 39V15h24v24M16 15V9h16v6M20 23h8M24 19v17M15 30h18" /><path d="M7 43h34" /></svg>;
    case "crane":
      return <svg {...common}><path d="M10 40V9h3v31M11.5 9h28M19 13h20M19 13l-7 9M31 9v11M39 9v8M31 20h8v5M35 25v10M31 35h8" /><path d="M7 40h10M28 40h14" /></svg>;
    case "excavator":
      return <svg {...common}><path d="M7 33h24l7-9-6-4H21l-4-10H11v17H7Z" /><path d="M17 10h7M21 20l9-9 8 4M36 24l5 4-4 5M10 39h8M31 39h8" /><circle cx="14" cy="35" r="4" /><circle cx="34" cy="35" r="4" /></svg>;
    case "warehouse":
      return <svg {...common}><path d="M6 40V14L24 5l18 9v26H6Z" /><path d="M13 40V24h9v16M29 40V24h6v16M13 18h22M10 21h5M29 21h6" /><path d="M6 44h36" /></svg>;
    case "safety":
      return <svg {...common}><path d="M24 5 39 11v10c0 10-6 17-15 21C15 38 9 31 9 21V11l15-6Z" /><path d="m16 24 5 5 11-12" /><path d="M18 10h12" /></svg>;
    default:
      return <svg {...common}><path d="M24 5 39 11v10c0 10-6 17-15 21C15 38 9 31 9 21V11l15-6Z" /></svg>;
  }
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
