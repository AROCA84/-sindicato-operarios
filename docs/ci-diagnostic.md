# Diagnóstico CI — 17/10/2026

## Resultado

- Build de GitHub Pages: correcto.
- E2E de producción: 18/20 pruebas correctas.
- Los 2 fallos eran el mismo problema de selector: el test buscaba un enlace de certificado, mientras la interfaz actual presenta el checkout como botón `CERTIFICADO · 4,99 €`.
- Se corrige únicamente el selector E2E para que valide la interfaz real.

## Alcance

No se modifican pagos, Supabase, autenticación ni lógica de emisión del certificado.
