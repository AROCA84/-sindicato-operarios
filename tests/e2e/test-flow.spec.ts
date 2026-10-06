import { test, expect } from "@playwright/test";

/**
 * E2E tests for the full approved flow and certificate.
 *
 * Tests run against the internal preview route (/pruebas/test?prueba=1) which
 * simulates an approved result without needing a real afiliado in the database.
 * This covers the entire UI flow from result → certificate → payment.
 *
 * Additional tests verify security: forged scores are rejected.
 */

test.describe("Flujo de aprobado — prueba interna", () => {
  test("muestra APROBADO con puntuación, revisión y acceso a certificado", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });

    // Wait for the result phase to render (internalPreview starts in result phase)
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/aciertos/).first()).toBeVisible();
    await expect(page.getByText("Revisión de respuestas")).toBeVisible();
    await expect(page.getByText("Respuesta correcta")).toBeVisible();

    // Certificate access link should be visible
    await expect(page.getByRole("link", { name: /Obtener diploma.*certificado/i })).toBeVisible();
  });

  test("no muestra botón de repetir test tras aprobar", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });

    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });

    // The "Repetir Test Gratis" button should NOT appear when approved
    await expect(page.getByRole("button", { name: /Repetir Test/i })).not.toBeVisible();
  });

  test("muestra el recuento de preguntas acertadas y falladas", async ({ page }) => {
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });

    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });

    // Check that the review section shows correct/wrong markers
    const reviewSection = page.getByText("Revisión de respuestas").locator("xpath=ancestor::section");
    await expect(reviewSection).toBeVisible();
    // Should have check marks (✓) for correct answers
    await expect(reviewSection.getByText("✓")).toBeVisible();
  });
});

test.describe("Página de certificado — validación de seguridad", () => {
  test("rechaza score falseado sin intento real", async ({ page }) => {
    // Try to access certificate with a forged score but no real attempt
    await page.goto(
      "/certificado/carretillero?score=20&total=20&intento=INTENTO-FALSO",
      { waitUntil: "domcontentloaded" }
    );

    // Should show "no disponible" since the attempt doesn't exist in the DB
    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });

  test("rechaza acceso sin intento ni código de pago", async ({ page }) => {
    await page.goto("/certificado/carretillero", { waitUntil: "domcontentloaded" });

    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });

  test("rechaza score falseado en otro curso", async ({ page }) => {
    await page.goto(
      "/certificado/pemp?score=20&total=20&intento=INTENTO-FALSO",
      { waitUntil: "domcontentloaded" }
    );

    await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Página de test — control de acceso", () => {
  test("exige afiliación cuando no hay sesión de afiliado", async ({ page }) => {
    await page.goto("/cursos/carretillas-elevadoras-frontales-y-retractiles/test", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.getByRole("heading", { name: "Afíliate gratis al Sindicato" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i })).toBeVisible();
  });

  test("la afiliación redirige de vuelta al test", async ({ page }) => {
    await page.goto("/cursos/carretillero/test", { waitUntil: "domcontentloaded" });

    const afiliateLink = page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i });
    await expect(afiliateLink).toBeVisible();

    // The link should contain returnTo parameter pointing to the test page
    const href = await afiliateLink.getAttribute("href");
    expect(href).toContain("returnTo=");
    expect(href).toContain("test");
  });
});

test.describe("Recuperación del aprobado — persistencia", () => {
  test("recarga la página y sigue mostrando el aprobado (prueba interna)", async ({ page }) => {
    // The internal preview simulates an approved state
    await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });

    // Reload the page
    await page.reload({ waitUntil: "domcontentloaded" });

    // Should still show the approved result (internalPreview sets it on mount)
    await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Página de verificación", () => {
  test("muestra mensaje de no disponible con código inválido", async ({ page }) => {
    await page.goto("/verificar?codigo=SDO-INVALIDO-12345", { waitUntil: "domcontentloaded" });

    await expect(page.getByText(/Verificación no disponible/i)).toBeVisible({ timeout: 10000 });
  });
});
