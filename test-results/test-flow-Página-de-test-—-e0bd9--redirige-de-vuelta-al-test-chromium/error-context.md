# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-flow.spec.ts >> Página de test — control de acceso >> la afiliación redirige de vuelta al test
- Location: tests/e2e/test-flow.spec.ts:87:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/test"
Received string:    "/afiliarse?returnTo=%2Fcursos%2Fcarretillero%2Ftest"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - link "← Volver al curso" [ref=e4] [cursor=pointer]:
        - /url: /cursos/carretillero
      - generic [ref=e5]:
        - generic [ref=e6]:
          - generic [ref=e7]: SO
          - paragraph [ref=e8]: Antes de comenzar el test
          - heading "Afíliate gratis al Sindicato" [level=1] [ref=e9]
          - paragraph [ref=e10]: El acceso a la formación y a los test es gratuito. Solo necesitamos que te unas gratis para darte acceso al área de formación.
        - generic [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13]: ✓ Afiliación gratuita
            - generic [ref=e14]: ✓ Temarios gratuitos
            - generic [ref=e15]: ✓ Test gratuitos
            - generic [ref=e16]: ✓ Certificado opcional tras aprobar
          - link "Afiliarme gratis y hacer el test" [ref=e17] [cursor=pointer]:
            - /url: /afiliarse?returnTo=%2Fcursos%2Fcarretillero%2Ftest
          - paragraph [ref=e18]: No se cobra nada por afiliarte, estudiar ni realizar el test.
  - alert [ref=e19]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * E2E tests for the full approved flow and certificate.
  5   |  *
  6   |  * Tests run against the internal preview route (/pruebas/test?prueba=1) which
  7   |  * simulates an approved result without needing a real afiliado in the database.
  8   |  * This covers the entire UI flow from result → certificate → payment.
  9   |  *
  10  |  * Additional tests verify security: forged scores are rejected.
  11  |  */
  12  | 
  13  | test.describe("Flujo de aprobado — prueba interna", () => {
  14  |   test("muestra APROBADO con puntuación, revisión y acceso a certificado", async ({ page }) => {
  15  |     await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
  16  | 
  17  |     // Wait for the result phase to render (internalPreview starts in result phase)
  18  |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  19  |     await expect(page.getByText(/aciertos/).first()).toBeVisible();
  20  |     await expect(page.getByText("Revisión de respuestas")).toBeVisible();
  21  |     await expect(page.getByText("Respuesta correcta")).toBeVisible();
  22  | 
  23  |     // Certificate access link should be visible
  24  |     await expect(page.getByRole("link", { name: /Obtener diploma.*certificado/i })).toBeVisible();
  25  |   });
  26  | 
  27  |   test("no muestra botón de repetir test tras aprobar", async ({ page }) => {
  28  |     await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
  29  | 
  30  |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  31  | 
  32  |     // The "Repetir Test Gratis" button should NOT appear when approved
  33  |     await expect(page.getByRole("button", { name: /Repetir Test/i })).not.toBeVisible();
  34  |   });
  35  | 
  36  |   test("muestra el recuento de preguntas acertadas y falladas", async ({ page }) => {
  37  |     await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
  38  | 
  39  |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  40  | 
  41  |     // Check that the review section shows correct/wrong markers
  42  |     const reviewSection = page.getByText("Revisión de respuestas").locator("xpath=ancestor::section");
  43  |     await expect(reviewSection).toBeVisible();
  44  |     // Should have check marks (✓) for correct answers
  45  |     await expect(reviewSection.getByText("✓")).toBeVisible();
  46  |   });
  47  | });
  48  | 
  49  | test.describe("Página de certificado — validación de seguridad", () => {
  50  |   test("rechaza score falseado sin intento real", async ({ page }) => {
  51  |     // Try to access certificate with a forged score but no real attempt
  52  |     await page.goto(
  53  |       "/certificado/carretillero?score=20&total=20&intento=INTENTO-FALSO",
  54  |       { waitUntil: "domcontentloaded" }
  55  |     );
  56  | 
  57  |     // Should show "no disponible" since the attempt doesn't exist in the DB
  58  |     await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  59  |   });
  60  | 
  61  |   test("rechaza acceso sin intento ni código de pago", async ({ page }) => {
  62  |     await page.goto("/certificado/carretillero", { waitUntil: "domcontentloaded" });
  63  | 
  64  |     await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  65  |   });
  66  | 
  67  |   test("rechaza score falseado en otro curso", async ({ page }) => {
  68  |     await page.goto(
  69  |       "/certificado/pemp?score=20&total=20&intento=INTENTO-FALSO",
  70  |       { waitUntil: "domcontentloaded" }
  71  |     );
  72  | 
  73  |     await expect(page.getByText(/no disponible/i)).toBeVisible({ timeout: 10000 });
  74  |   });
  75  | });
  76  | 
  77  | test.describe("Página de test — control de acceso", () => {
  78  |   test("exige afiliación cuando no hay sesión de afiliado", async ({ page }) => {
  79  |     await page.goto("/cursos/carretillas-elevadoras-frontales-y-retractiles/test", {
  80  |       waitUntil: "domcontentloaded",
  81  |     });
  82  | 
  83  |     await expect(page.getByRole("heading", { name: "Afíliate gratis al Sindicato" })).toBeVisible();
  84  |     await expect(page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i })).toBeVisible();
  85  |   });
  86  | 
  87  |   test("la afiliación redirige de vuelta al test", async ({ page }) => {
  88  |     await page.goto("/cursos/carretillero/test", { waitUntil: "domcontentloaded" });
  89  | 
  90  |     const afiliateLink = page.getByRole("link", { name: /Afiliarme gratis y hacer el test/i });
  91  |     await expect(afiliateLink).toBeVisible();
  92  | 
  93  |     // The link should contain returnTo parameter
  94  |     const href = await afiliateLink.getAttribute("href");
  95  |     expect(href).toContain("returnTo=");
> 96  |     expect(href).toContain("/test");
      |                  ^ Error: expect(received).toContain(expected) // indexOf
  97  |   });
  98  | });
  99  | 
  100 | test.describe("Recuperación del aprobado — persistencia", () => {
  101 |   test("recarga la página y sigue mostrando el aprobado (prueba interna)", async ({ page }) => {
  102 |     // The internal preview simulates an approved state
  103 |     await page.goto("/pruebas/test", { waitUntil: "domcontentloaded" });
  104 |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  105 | 
  106 |     // Reload the page
  107 |     await page.reload({ waitUntil: "domcontentloaded" });
  108 | 
  109 |     // Should still show the approved result (internalPreview sets it on mount)
  110 |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
  111 |   });
  112 | });
  113 | 
  114 | test.describe("Página de verificación", () => {
  115 |   test("muestra mensaje de no disponible con código inválido", async ({ page }) => {
  116 |     await page.goto("/verificar?codigo=SDO-INVALIDO-12345", { waitUntil: "domcontentloaded" });
  117 | 
  118 |     await expect(page.getByText(/Verificación no disponible/i)).toBeVisible({ timeout: 10000 });
  119 |   });
  120 | });
  121 | 
```