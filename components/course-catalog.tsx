"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courses, categories, type Category } from "@/lib/courses";

const categoryIcons: Record<Category, string> = {
  "Manutención y Carretillas": "🚜",
  "Elevación y Plataformas": "🏢",
  "Grúas y Equipos de Elevación": "⚙️",
  "Maquinaria y Movimiento de Tierras": "🚧",
  "Logística y Almacén": "📦",
  "Prevención de Riesgos Laborales": "🦺",
  "Manipulación y Seguridad": "🛡️",
};

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
                    <span className="text-2xl" aria-hidden="true">{categoryIcons[category]}</span>
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
              <p className="text-lg font-black">🔜 Próximamente</p>
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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
