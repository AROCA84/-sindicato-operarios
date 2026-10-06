import { redirect } from "next/navigation";

export default function TestPruebaPage() {
  redirect("/cursos/carretillero/test?prueba=1");
}
