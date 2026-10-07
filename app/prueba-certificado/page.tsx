import { notFound, redirect } from "next/navigation";
import { internalPreviewEnabled } from "@/lib/internal-preview";

export const dynamic = "force-dynamic";

export default function PruebaCertificadoPage() {
  if (!internalPreviewEnabled()) notFound();
  redirect("/certificado/carretillas-elevadoras-frontales-y-retractiles?prueba=1");
}
