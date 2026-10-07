import { notFound } from "next/navigation";
import { internalPreviewEnabled } from "@/lib/internal-preview";
import { CertificateDesigner } from "./certificate-designer";

export const dynamic = "force-dynamic";

// Design tool that renders certificates with arbitrary names: never public.
export default function AdminCertificadosPage() {
  if (!internalPreviewEnabled()) notFound();
  return <CertificateDesigner />;
}
