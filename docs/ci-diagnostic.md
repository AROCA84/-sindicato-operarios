# Diagnóstico de GitHub Actions y validaciones

## Evidencia revisada

- Ejecución del agente local: [run 39000107650](https://github.com/AROCA84/-sindicato-operarios/actions/runs/39000107650), fallo en el paso de comprobaciones.
- Ejecución E2E: [run 38999994532](https://github.com/AROCA84/-sindicato-operarios/actions/runs/38999994532), 18 pruebas pasaron y 2 fallaron en la aserción del acceso al certificado.
- Archivos inspeccionados: `package.json`, `package-lock.json`, `eslint.config.mjs`, workflows de `.github/workflows`, `playwright.config.ts` y `tests/e2e/test-flow.spec.ts`.

## Problemas confirmados

1. **Configuración de ESLint incompatible.** El log muestra `TypeError: nextVitals is not iterable` al importar `eslint-config-next/core-web-vitals.js` y extenderlo como array. La configuración se adapta usando `FlatCompat` para convertir las configuraciones heredadas de Next en configuración flat compatible con ESLint 9.
2. **Herramientas de lint no declaradas.** `package.json` define `lint: eslint .`, pero no declara `eslint` ni `eslint-config-next` en `devDependencies`. El workflow del agente las instalaba de forma temporal. Esta PR mantiene la instalación temporal en CI para no editar el lockfile manualmente. **Pendiente:** incorporar esas herramientas como dependencias de desarrollo y regenerar `package-lock.json` con npm en un entorno con acceso al registro.
3. **Versiones de Node distintas.** `package.json` exige Node `24.x`, mientras el workflow del agente usaba Node 22. Se alinea con Node 24.
4. **Aserción E2E desactualizada.** El test buscaba un enlace “Obtener diploma… certificado”, pero la interfaz real presenta un botón de formulario “CERTIFICADO · 4,99 €”. Se actualiza el selector para comprobar el control actual.
5. **Instalación E2E.** Se usa `npm ci` para las dependencias bloqueadas del proyecto y se fija la versión temporal del runner Playwright. El runner sigue sin estar declarado en `package.json`/lockfile; queda como mejora pendiente.

## Comprobaciones

Los cambios se preparan en una rama separada y deben verificarse con los workflows de la PR. No se afirma que lint, TypeScript, build o E2E hayan pasado hasta que GitHub publique sus resultados para esta rama.

## Alcance y seguridad

No se modifican `main`, Supabase, autenticación, secretos, pagos myPOS ni despliegues. No se fusiona automáticamente la PR.
