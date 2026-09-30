import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCourses } from "@/lib/academy-catalog";
import { CourseExam } from "@/components/course-exam";

export function generateStaticParams() {
  return allCourses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = allCourses.find((item) => item.id === id);
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
  const course = allCourses.find((item) => item.id === id);
  if (!course) notFound();
  return <CourseExam course={course} />;
}
