import { redirect } from "next/navigation";

export default function PruebaCertificadoPage() {
  // Acceso interno: entra siempre en el modo de prueba, sin pago ni código.
  redirect("/certificado/carretillas-elevadoras-frontales-y-retractiles?prueba=1");
}
