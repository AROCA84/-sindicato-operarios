"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courses, categories, type Category } from "@/lib/courses";

const categoryIcons: Record<string, CategoryIconName> = {
  "Manutención y Carretillas": "forklift",
  "Elevación y Plataformas": "platform",
  "Grúas y Equipos de Elevación": "crane",
  "Maquinaria y Movimiento de Tierras": "excavator",
  "Logística y Almacén": "warehouse",
  "Prevención de Riesgos Laborales": "safety",
  "Manipulación y Seguridad": "shield",
};

type CategoryIconName = "forklift" | "platform" | "crane" | "excavator" | "warehouse" | "safety" | "shield";

type TrainingGroup = {
  title: string;
  description: string;
  icon: CategoryIconName;
  categories: string[];
};

const trainingGroups: TrainingGroup[] = [
  {
    title: "Industria y Maquinaria",
    description: "Maquinaria, manutención, elevación, construcción y fabricación industrial.",
    icon: "forklift",
    categories: [
      "Manutención y Carretillas", "Maquinaria y Movimiento de Tierras", "Elevación y Plataformas",
      "Grúas y Equipos de Elevación", "Construcción y Obra Civil", "Mecánica", "Mantenimiento Industrial",
      "Soldadura y Fabricación Mecánica", "Madera, Mueble y Carpintería", "Textil y Confección",
      "Artes Gráficas", "Vidrio y Cerámica", "Industrias Extractivas",
    ],
  },
  {
    title: "Logística y Transporte",
    description: "Almacén, distribución, transporte, carga y operaciones logísticas.",
    icon: "warehouse",
    categories: [
      "Logística y Almacén", "Transporte", "Automoción",
    ],
  },
  {
    title: "Prevención y Seguridad",
    description: "Prevención de riesgos, emergencias, protección y seguridad profesional.",
    icon: "safety",
    categories: [
      "Prevención de Riesgos Laborales", "Manipulación y Seguridad", "Emergencias y Seguridad", "Seguridad Privada y Protección",
    ],
  },
  {
    title: "Mantenimiento y Tecnología",
    description: "Electricidad, electrónica, automatización, robótica y tecnología industrial.",
    icon: "crane",
    categories: [
      "Electricidad y Electrónica", "Automatización, Robótica e Industria 4.0", "Energía y Renovables",
      "Climatización y Refrigeración", "Química e Industria",
    ],
  },
  {
    title: "Informática e Inteligencia Artificial",
    description: "Competencias digitales, programación, IA, automatización y ciberseguridad.",
    icon: "platform",
    categories: [
      "Informática y Competencias Digitales", "Inteligencia Artificial", "Programación y Desarrollo", "Ciberseguridad",
    ],
  },
  {
    title: "Empresa, Administración y Empleo",
    description: "Empresa, administración, ventas, marketing y desarrollo profesional.",
    icon: "shield",
    categories: [
      "Administración y Gestión", "Comercio y Ventas", "Marketing Digital", "Diseño y Contenidos Digitales",
      "Gestión y Dirección", "Habilidades Profesionales", "Empleo y Carrera Profesional", "Idiomas",
    ],
  },
  {
    title: "Servicios y Atención",
    description: "Hostelería, sanidad, servicios sociales y atención a personas.",
    icon: "safety",
    categories: [
      "Hostelería y Turismo", "Sanidad y Cuidados", "Servicios Sociales", "Limpieza y Servicios",
      "Actividades Físicas y Deportivas", "Imagen Personal",
    ],
  },
  {
    title: "Energía, Medio Ambiente y Sectores Profesionales",
    description: "Sostenibilidad, medio ambiente, agricultura, forestal y sectores especializados.",
    icon: "excavator",
    categories: [
      "Medio Ambiente", "Agricultura y Medio Rural", "Jardinería y Forestal", "Marítimo-Pesquera",
    ],
  },
];

const categoryDescriptions: Record<string, string> = {
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
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

  const toggleGroup = (group: string) => {
    setOpenGroup((current) => (current === group ? null : group));
  };

  const toggleCategory = (category: string) => {
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
            Estudia y realiza el test gratis. Si apruebas, podrás continuar con el proceso para obtener tu certificado.
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
          <div className="mt-8 space-y-4">
            <h3 className="mb-4 text-2xl font-black text-navy">Categorías de formación</h3>
            <p className="mb-5 text-sm text-slate-600">
              Elige un área y despliega sus especialidades. Dentro de cada categoría iremos incorporando todos los cursos y sus tests.
            </p>

            {trainingGroups.map((group) => {
              const isGroupOpen = openGroup === group.title;
              return (
                <div key={group.title} className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    aria-expanded={isGroupOpen}
                    className="group flex w-full items-center gap-5 px-5 py-6 text-left transition-all duration-200 hover:bg-slate-50 sm:gap-7 sm:px-8 sm:py-7"
                  >
                    <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 bg-white shadow-md sm:h-22 sm:w-22" aria-hidden="true">
                      <IndustrialIcon name={group.icon} large />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-black uppercase tracking-[0.02em] text-navy sm:text-2xl">{group.title}</span>
                      <span className="mt-1.5 block text-sm text-slate-500 sm:text-base">{group.description}</span>
                      <span className="mt-2 block text-xs font-black uppercase tracking-wider text-safety-dark">
                        {group.categories.length} categorías
                      </span>
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-3xl font-light leading-none text-safety transition-all duration-200 group-hover:border-safety/50 group-hover:bg-safety/10 ${isGroupOpen ? "rotate-90 bg-safety/10" : ""}`} aria-hidden="true">›</span>
                  </button>

                  {isGroupOpen && (
                    <div className="space-y-2 border-t border-slate-100 bg-slate-50/70 p-3 sm:p-4">
                      {group.categories.map((category) => {
                        const isOpen = openCategory === category;
                        const categoryCourses = courses.filter((course) => course.category === category);
                        const knownCategory = category in categoryIcons;
                        return (
                          <div key={category} className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                            <button
                              type="button"
                              onClick={() => toggleCategory(category)}
                              aria-expanded={isOpen}
                              className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-slate-50 sm:px-5"
                            >
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white" aria-hidden="true">
                                <IndustrialIcon name={knownCategory ? categoryIcons[category] : group.icon} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-black uppercase text-navy sm:text-base">{category}</span>
                                <span className="mt-1 block text-xs text-slate-500">
                                  {categoryCourses.length > 0 ? `${categoryCourses.length} ${categoryCourses.length === 1 ? "curso" : "cursos"} disponibles` : "Nuevas formaciones próximamente"}
                                </span>
                              </span>
                              <span className={`text-2xl font-light text-safety transition-transform ${isOpen ? "rotate-90" : ""}`} aria-hidden="true">›</span>
                            </button>

                            {isOpen && (
                              <div className="border-t border-slate-100 bg-slate-50/70 p-3">
                                {categoryCourses.length > 0 ? (
                                  <div className="space-y-3">
                                    {categoryCourses.map((course) => <CourseRow key={course.id} course={course} />)}
                                  </div>
                                ) : (
                                  <div className="rounded-lg border border-dashed border-safety/50 bg-white p-5 text-center">
                                    <p className="font-bold text-navy">Próximamente</p>
                                    <p className="mt-1 text-sm text-slate-500">Estamos preparando cursos y tests para esta categoría.</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 rounded-xl border-2 border-safety bg-navy p-5 text-white">
              <p className="flex items-center gap-2 text-lg font-black"><span className="flex h-8 w-8 items-center justify-center rounded-md border border-safety/40 bg-safety/10 text-safety"><IndustrialIcon name="safety" /></span> Próximamente</p>
              <p className="mt-1 text-sm text-white/70">
                Seguimos ampliando el catálogo con nuevas formaciones, especialidades profesionales y tests.
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
          Formación gratuita
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
  const size = large ? 60 : 30;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const dark = "#243447";
  const orange = "#F59E0B";
  const yellow = "#FACC15";
  const blue = "#2563EB";
  const steel = "#94A3B8";
  const green = "#16A34A";
  switch (name) {
    case "forklift":
      return <svg {...common}><path fill="#E5E7EB" stroke={dark} strokeWidth="2" d="M9 43V23h18l9 15h16v9H9Z" /><path fill={orange} stroke={dark} strokeWidth="2" d="M27 23v15h9l-9-15Z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="M9 23h18v15H9z" /><path stroke={dark} strokeWidth="2" d="M48 16v22M53 16h-5M53 12h-9M20 48v6M45 48v6M14 57h12M39 57h12" /><circle fill={dark} stroke={dark} strokeWidth="2" cx="18" cy="47" r="5" /><circle fill={steel} stroke={dark} strokeWidth="2" cx="45" cy="47" r="5" /></svg>;
    case "platform":
      return <svg {...common}><path fill="#E2E8F0" stroke={dark} strokeWidth="2" d="M12 49h40M16 49V22h32v27" /><path fill={orange} stroke={dark} strokeWidth="2" d="M20 22V14h24v8H20Z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="M22 30h20v8H22z" /><path stroke={dark} strokeWidth="2" d="M28 38v11M36 38v11M8 55h48" /></svg>;
    case "crane":
      return <svg {...common}><path stroke={dark} strokeWidth="3" d="M14 53V11h4v42M16 11h37M24 17h29M39 11v20M53 11v12M39 31h14" /><path fill={orange} stroke={dark} strokeWidth="2" d="M43 31h10v7H43z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="M45 38h6v9h-6z" /><path stroke={dark} strokeWidth="2" d="M8 53h18M34 53h24" /></svg>;
    case "excavator":
      return <svg {...common}><path fill="#E5E7EB" stroke={dark} strokeWidth="2" d="M8 43h30l9-11-8-6H28l-5-13H14v23H8z" /><path fill={orange} stroke={dark} strokeWidth="2" d="M23 13h9l-4 13h-9z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="m37 26 9-10 10 5-8 10z" /><path stroke={dark} strokeWidth="2" d="M14 49h12M38 49h12" /><circle fill={dark} stroke={dark} strokeWidth="2" cx="17" cy="44" r="6" /><circle fill={steel} stroke={dark} strokeWidth="2" cx="43" cy="44" r="6" /></svg>;
    case "warehouse":
      return <svg {...common}><path fill="#E2E8F0" stroke={dark} strokeWidth="2" d="M7 51V19L32 7l25 12v32H7Z" /><path fill={orange} stroke={dark} strokeWidth="2" d="M7 19 32 7v9L7 28z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="M15 51V31h12v20M36 51V31h10v20" /><path stroke={dark} strokeWidth="2" d="M15 25h31M4 56h56" /></svg>;
    case "safety":
      return <svg {...common}><path fill="#E2E8F0" stroke={dark} strokeWidth="2" d="M32 6 54 15v14c0 14-9 24-22 29C19 53 10 43 10 29V15L32 6Z" /><path fill={green} stroke={dark} strokeWidth="2" d="m19 31 8 8 18-19-5-4-13 14-4-4z" /><path fill={yellow} stroke={dark} strokeWidth="2" d="M25 12h14v5H25z" /></svg>;
    default:
      return <svg {...common}><path fill="#E2E8F0" stroke={dark} strokeWidth="2" d="M32 6 54 15v14c0 14-9 24-22 29C19 53 10 43 10 29V15L32 6Z" /></svg>;
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
