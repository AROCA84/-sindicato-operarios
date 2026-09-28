import { CourseCatalog } from "@/components/course-catalog";

export default function CursosPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-navy px-5 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-safety">Formación</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Cursos para operarios</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Estudia gratis, realiza el test gratis y, si apruebas, decide si quieres obtener tu certificado por 4,99 €.
          </p>
        </div>
      </section>
      <CourseCatalog />
    </main>
  );
}
