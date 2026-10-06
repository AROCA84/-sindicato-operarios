-- Migration: Adapt intentos_test and certificados to work with text course slugs
-- and align code with the real database schema.
--
-- These tables are empty in production (0 rows each), so this migration is safe.
-- It does NOT touch afiliados, cursos, or temarios.
-- It does NOT add invented columns — it only changes curso_id type from uuid to text
-- so the application can store course slugs directly (the cursos table only has 12
-- of the 112+ courses in the frontend catalog).

-- 1. Remove FK constraints on curso_id (they reference cursos.id which is uuid)
ALTER TABLE public.intentos_test DROP CONSTRAINT IF EXISTS intentos_test_curso_id_fkey;
ALTER TABLE public.certificados DROP CONSTRAINT IF EXISTS certificados_curso_id_fkey;

-- 2. Change curso_id from uuid to text in both tables
ALTER TABLE public.intentos_test ALTER COLUMN curso_id TYPE text;
ALTER TABLE public.certificados ALTER COLUMN curso_id TYPE text;

-- 3. Ensure nombre and email can be stored (they already exist but make sure
--    they have defaults so inserts that don't specify them don't fail on NOT NULL)
--    Actually they are NOT NULL with no default, so the code MUST provide them.
--    We add defaults to be safe:
ALTER TABLE public.intentos_test ALTER COLUMN nombre SET DEFAULT '';
ALTER TABLE public.intentos_test ALTER COLUMN email SET DEFAULT '';
ALTER TABLE public.certificados ALTER COLUMN nombre SET DEFAULT '';
ALTER TABLE public.certificados ALTER COLUMN email SET DEFAULT '';

-- 4. Create indexes for the common query patterns
CREATE INDEX IF NOT EXISTS idx_intentos_afiliado_curso ON public.intentos_test(afiliado_id, curso_id, aprobado);
CREATE INDEX IF NOT EXISTS idx_certificados_codigo ON public.certificados(codigo_certificado);
CREATE INDEX IF NOT EXISTS idx_certificados_afiliado ON public.certificados(afiliado_id);
