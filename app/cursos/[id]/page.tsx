import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CourseDetail } from "@/components/course-detail";
import { allCourses, getAcademyCourse } from "@/lib/academy-catalog";

export function generateStaticParams() {
  return allCourses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getAcademyCourse(id);
  if (!course) return { title: "Curso no encontrado" };
  return {
    title: `${course.title} | Sindicato de Operarios`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getAcademyCourse(id);
  if (!course) notFound();

  const modules = course ? (await import("@/lib/academy-catalog")).getAllTemario(course) : [];

  return (
    <>
      <SiteHeader />
      <CourseDetail course={course} modules={modules} />
      <SiteFooter />
    </>
  );
}
