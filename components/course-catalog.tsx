"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { courses, categories, type Category } from "@/lib/courses";

type Filter = "Todos" | Category;
const filters: Filter[] = ["Todos", ...categories];

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesFilter = filter === "Todos" || c.category === filter;
      const matchesQuery =
        q === "" ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <section id="cursos" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-safety-dark">
            Catálogo formativo
          </span>
          <h2 className="mt-3 text-balance text-3xl font-black text-navy sm:text-4xl">
            Nuestros cursos de maquinaria y seguridad
          </h2>
          <p className="mt-4 text-pretty text-slate-600">
            Formación práctica y certificada para operarios. Encuentra el curso
            que impulsa tu carrera profesional.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-5">
          <div className="relative mx-auto w-full max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar curso..."
              aria-label="Buscar curso"
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-navy outline-none transition-colors placeholder:text-slate-400 focus:border-safety focus:ring-2 focus:ring-safety/30"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f
                    ? "bg-navy text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <article
                key={course.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-navy/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-safety backdrop-blur">
                    {course.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-navy">
                    <Link
                      href={`/cursos/${course.id}`}
                      className="outline-none transition-colors hover:text-safety-dark focus-visible:text-safety-dark"
                    >
                      {course.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">
                    {course.description}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/cursos/${course.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-navy px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      Ver Temario
                    </Link>
                    <Link
                      href={`/cursos/${course.id}/test`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-safety px-4 py-2.5 text-sm font-bold text-navy shadow-sm transition-colors hover:bg-safety-dark"
                    >
                      Empezar Test Gratis
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-slate-500">
            No se han encontrado cursos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
