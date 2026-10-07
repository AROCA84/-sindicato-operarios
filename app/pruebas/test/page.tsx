import { notFound } from "next/navigation";
import { allCourses } from "@/lib/academy-catalog";
import { getExam, PASS_MARK, toPublicQuestions } from "@/lib/exam";
import { internalPreviewEnabled } from "@/lib/internal-preview";
import { CourseExam } from "@/components/course-exam";

export const dynamic = "force-dynamic";

export default function TestPruebaPage() {
  if (!internalPreviewEnabled()) notFound();
  const course = allCourses.find((item) => item.id === "carretillero");
  if (!course) notFound();
  const questions = getExam(course);
  const correct = questions.map((q) => q.answer);
  const answers = questions.map((q, i) => (i < PASS_MARK + 2 ? q.answer : (q.answer + 1) % q.options.length));
  return <CourseExam course={course} questions={toPublicQuestions(questions)} previewResult={{ answers, correct }} />;
}
