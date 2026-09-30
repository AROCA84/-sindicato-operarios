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
                    className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-safety-dark" aria-hidden="true">
                      <IndustrialIcon name={categoryIcons[category]} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-black uppercase tracking-tight text-navy sm:text-lg">
                        {category}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {categoryCourses.length > 0
                          ? `${categoryCourses.length} ${categoryCourses.length === 1 ? "curso" : "cursos"}`
                          : "Nuevas formaciones próximamente"}
                      </span>
                    </span>
                    <span
                      className={`text-2xl font-light text-safety transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
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

function IndustrialIcon({ name }: { name: CategoryIconName }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "forklift":
      return <svg {...common}><path d="M5 17V7h5l3 6h6v4H5Z" /><path d="M10 7v6M13 13l-2-6M4 20h3M17 20h3" /><circle cx="6.5" cy="18.5" r="1.5" /><circle cx="18.5" cy="18.5" r="1.5" /></svg>;
    case "platform":
      return <svg {...common}><path d="M5 18h14M7 18V8h10v10M9 8V5h6v3M4 21h16" /><path d="M10 12h4M12 9v7" /></svg>;
    case "crane":
      return <svg {...common}><path d="M5 19V5h2v14M6 5h13M12 5v3M19 5v5h-7M12 8v7M10 15h4M17 10v6M15 19h4" /><path d="M4 19h4" /></svg>;
    case "excavator":
      return <svg {...common}><path d="M4 17h11l3-5-3-2h-4l-2-5H6v8H4Z" /><path d="M9 5h3M6 20h3M16 20h3M4 17l-1 3M13 10l3-3 3 2" /><circle cx="7" cy="18.5" r="1.5" /><circle cx="17" cy="18.5" r="1.5" /></svg>;
    case "warehouse":
      return <svg {...common}><path d="M3 20V9l9-5 9 5v11H3Z" /><path d="M7 20v-6h4v6M15 20v-6h2v6M7 10h10M5 12h2M15 12h2" /></svg>;
    case "safety":
      return <svg {...common}><path d="M12 3 20 6v6c0 5-3.2 7.9-8 9-4.8-1.1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
    default:
      return <svg {...common}><path d="M12 3 20 6v6c0 5-3.2 7.9-8 9-4.8-1.1-8-4-8-9V6l8-3Z" /></svg>;
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
