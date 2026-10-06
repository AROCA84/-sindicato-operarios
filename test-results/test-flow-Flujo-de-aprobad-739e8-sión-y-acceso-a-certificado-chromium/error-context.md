# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-flow.spec.ts >> Flujo de aprobado — prueba interna >> muestra APROBADO con puntuación, revisión y acceso a certificado
- Location: tests/e2e/test-flow.spec.ts:14:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('¡APROBADO!')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('¡APROBADO!') with timeout 10000ms
  - waiting for getByText('¡APROBADO!')

```

```yaml
- main:
  - link "Volver al curso":
    - /url: /cursos/carretillas-elevadoras-frontales-y-retractiles
  - text: "Test 100% Gratuito Afiliado · acceso gratuito Aprobado: 14 / 20 aciertos"
  - 'heading "Test Final · Carretillas Elevadoras: Frontales y Retráctiles" [level=1]'
  - heading "NO APROBADO" [level=2]
  - paragraph: Necesitas al menos 14 aciertos para aprobar. Repasa el temario y vuelve a intentarlo, es gratis.
  - text: 10 / 10 aciertos
  - link "Repasar el temario":
    - /url: /cursos/carretillas-elevadoras-frontales-y-retractiles
  - button "Repetir Test Gratis"
  - paragraph: No has obtenido el apto. Repasa el temario y vuelve a intentarlo gratis. No se realiza ningún pago por suspender.
  - heading "Revisión de tus respuestas" [level=3]
  - paragraph: Comprueba qué has acertado y cuál era la respuesta correcta en cada pregunta.
  - article:
    - text: ✓
    - paragraph: Pregunta 1. ¿Qué ley regula la Prevención de Riesgos Laborales en España?
    - paragraph: "Tu respuesta: Ley 31/1995 de Prevención de Riesgos Laborales"
  - article:
    - text: ✓
    - paragraph: "Pregunta 2. El chaleco reflectante de alta visibilidad sirve principalmente para:"
    - paragraph: "Tu respuesta: Que el operario sea visible para otros vehículos y peatones"
  - article:
    - text: ✓
    - paragraph: "Pregunta 3. Si detectas una avería o anomalía en la máquina, debes:"
    - paragraph: "Tu respuesta: Comunicarla al responsable y no utilizar el equipo"
  - article:
    - text: ✓
    - paragraph: "Pregunta 4. En una zona con circulación de peatones y máquinas, la velocidad debe ser:"
    - paragraph: "Tu respuesta: Reducida y adaptada a la visibilidad y el entorno"
  - article:
    - text: ✓
    - paragraph: Pregunta 5. ¿Quién puede manejar una máquina de trabajo en la empresa?
    - paragraph: "Tu respuesta: Personal formado y autorizado para ese equipo"
  - article:
    - text: ✓
    - paragraph: Pregunta 6. ¿Cuándo debe realizarse la revisión preoperacional del equipo?
    - paragraph: "Tu respuesta: Antes de cada turno de trabajo"
  - article:
    - text: ✓
    - paragraph: "Pregunta 7. La señalización de seguridad en el centro de trabajo tiene como objetivo:"
    - paragraph: "Tu respuesta: Advertir de riesgos y ordenar la circulación"
  - article:
    - text: ✓
    - paragraph: Pregunta 8. ¿Qué significa el marcado CE en una máquina?
    - paragraph: "Tu respuesta: Que cumple la normativa de seguridad europea"
  - article:
    - text: ✓
    - paragraph: Pregunta 9. ¿Qué información fundamental aparece en la placa de características?
    - paragraph: "Tu respuesta: La capacidad nominal de carga del equipo"
  - article:
    - text: ✓
    - paragraph: Pregunta 10. ¿Cuál es un Equipo de Protección Individual (EPI) básico en trabajos con maquinaria?
    - paragraph: "Tu respuesta: Calzado de seguridad"
- alert
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
> 18  |     await expect(page.getByText("¡APROBADO!")).toBeVisible({ timeout: 10000 });
      |                                                ^ Error: expect(locator).toBeVisible() failed
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
  96  |     expect(href).toContain("/test");
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
```