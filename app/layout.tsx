import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Sindicato de Operarios | Formación Gratuita para Operarios",
  description:
    "Afíliate gratis al Sindicato de Operarios y accede a cursos y tests de maquinaria a 0 €: carretillero, PEMP, puente grúa, PRL y mucho más.",
  keywords: [
    "sindicato de operarios",
    "cursos gratis operarios",
    "curso carretillero gratis",
    "formación PRL",
    "cursos maquinaria",
  ],
  openGraph: {
    title: "Sindicato de Operarios | Formación Gratuita para Operarios",
    description:
      "Afiliación 100% gratuita y acceso ilimitado a todos los cursos y tests a 0 €.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2340",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
