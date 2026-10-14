import { redirect } from "next/navigation";

export default function PruebaCertificadoPage() {
  // Abre la previsualización interna del certificado y el carné, sin pasar por el pago.
  redirect("/prueba-certificacion?prueba=1");
}
