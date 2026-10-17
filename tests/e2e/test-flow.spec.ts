import { test, expect } from "@playwright/test";

test.describe("Flujo de aprobado — prueba interna", () => {
  test("muestra APROBADO con puntuación, revisión y acceso a certificado", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/aciertos/).first()).toBeVisible();
    await expect(page.getByText(/Revisión de.*respuestas/)).toBeVisible();
    await expect(page.getByText(/Respuesta correcta/).first()).toBeVisible();

    // The current UI exposes certificate checkout as a button, not a link.
    await expect(page.getByRole("button", { name: /CERTIFICADO.*4,99/i })).toBeVisible();
  });

  test("no muestra botón de repetir test tras aprobar", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("button", { name: /Repetir Test/i })).not.toBeVisible();
  });

  test("muestra el recuento de preguntas acertadas y falladas", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
    const reviewSection = page.getByText(/Revisión de.*respuestas/).locator("xpath=ancestor::section");
    await reviewSection.scrollIntoViewIfNeeded();
    await expect(reviewSection).toBeVisible();
    await expect(reviewSection.getByText("✓").first()).toBeVisible();
  });
});

test.describe("Página de certificado — validación de seguridad", () => {
  test("rechaza score falseado sin intento real", async ({ page }) => {
    await page.goto("/certificado/carretillero?score=20&total=20&intento=INTENTO-FALSO", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });

  test("rechaza acceso sin intento ni código de pago", async ({ page }) => {
    await page.goto("/certificado/carretillero", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });

  test("rechaza score falseado en otro curso", async ({ page }) => {
    await page.goto("/certificado/pemp?score=20&total=20&intento=INTENTO-FALSO", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Página de test — control de acceso", () => {
  test("exige afiliación cuando no hay sesión de afiliado", async ({ page }) => {
    await page.goto("/cursos/carretillas-elevadoras-frontales-y-retractiles/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Afíliate gratis al Sindicato" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i })).toBeVisible();
  });

  test("la afiliación redirige de vuelta al test", async ({ page }) => {
    await page.goto("/cursos/carretillero/test", { waitUntil: "domcontentloaded" });
    const afiliateLink = page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i });
    await expect(afiliateLink).toBeVisible();
    const href = await afiliateLink.getAttribute("href");
    expect(href).toContain("returnTo=");
    expect(href).toContain("test");
  });
});

test.describe("Recuperación del aprobado — persistencia", () => {
  test("recarga la página y sigue mostrando el aprobado (prueba interna)", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Página de verificación", () => {
  test("muestra mensaje de no disponible con código inválido", async ({ page }) => {
    await page.goto("/verificar?codigo=SDO-INVALIDO-12345", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/Verificación no disponible/i)).toBeVisible({ timeout: 10000 });
  });
});
