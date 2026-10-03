import { test, expect } from "@playwright/test";

test("recorrido de test: acceso, resultado, revisión y certificado", async ({ page }) => {
  await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("¡APROBADO!")).toBeVisible();
  await expect(page.getByText(/aciertos/).first()).toBeVisible();
  await expect(page.getByText("Revisión de respuestas")).toBeVisible();
  await expect(page.getByText("Respuesta correcta")).toBeVisible();
  await expect(page.getByRole("link", { name: /Obtener diploma.*certificado/i })).toBeVisible();
});

test("el test exige afiliación cuando no hay sesión de afiliado", async ({ page }) => {
  await page.goto("/cursos/carretillas-elevadoras-frontales-y-retractiles/test", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByRole("heading", { name: "Afíliate gratis al Sindicato" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i })).toBeVisible();
});
