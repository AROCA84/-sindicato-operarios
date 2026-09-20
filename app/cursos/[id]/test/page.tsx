import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { CourseExam } from "@/components/course-exam";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) return { title: "Examen no encontrado" };
  return {
    title: `Examen Gratis · ${course.title} | Sindicato de Operarios`,
    description: `Realiza el test de examen oficial del ${course.title} de forma gratuita.`,
  };
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  return <CourseExam course={course} />;
}
