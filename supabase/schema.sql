create extension if not exists pgcrypto;

-- La numeracion publica empieza en 1137 para que el primer afiliado generado sea 1137.
-- La secuencia es persistente, unica y consecutiva: 1137, 1138, 1139...
create sequence if not exists public.numero_afiliado_seq start 1137;

-- Si la secuencia ya existia con la configuracion anterior, la ajustamos solo si aun no ha generado afiliados.
do $$
declare current_value bigint;
begin
  current_value := last_value from public.numero_afiliado_seq;
  if current_value < 1137 then
    perform setval('public.numero_afiliado_seq', 1137, false);
  end if;
end $$;

create table if not exists public.afiliados (
  id uuid primary key default gen_random_uuid(),
  numero_afiliado bigint unique,
  nombre text not null,
  apellidos text not null,
  email text unique not null,
  telefono text,
  whatsapp text,
  fecha_afiliacion timestamptz not null default now(),
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.generar_numero_afiliado()
returns bigint
language plpgsql
as $$
begin
  return nextval('public.numero_afiliado_seq');
end;
$$;

create or replace function public.asignar_numero_afiliado()
returns trigger
language plpgsql
as $$
begin
  if new.numero_afiliado is null then
    new.numero_afiliado := public.generar_numero_afiliado();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_afiliado_numero on public.afiliados;
create trigger trg_afiliado_numero
before insert on public.afiliados
for each row execute function public.asignar_numero_afiliado();

create table if not exists public.intentos_test (
  id uuid primary key default gen_random_uuid(),
  afiliado_id uuid not null references public.afiliados(id) on delete cascade,
  curso_id text not null,
  puntuacion integer not null check (puntuacion >= 0),
  total integer not null check (total > 0),
  aprobado boolean not null,
  respuestas jsonb,
  realizado_at timestamptz not null default now()
);

create table if not exists public.certificados (
  id uuid primary key default gen_random_uuid(),
  afiliado_id uuid not null references public.afiliados(id) on delete cascade,
  curso_id text not null,
  codigo text unique not null,
  puntuacion integer not null,
  total integer not null,
  estado_pago text not null default 'pendiente' check (estado_pago in ('pendiente','pagado','reembolsado')),
  estado_emision text not null default 'pendiente' check (estado_emision in ('pendiente','emitido','anulado')),
  pdf_url text,
  whatsapp_estado text not null default 'pendiente' check (whatsapp_estado in ('pendiente','enviado','error')),
  whatsapp_enviado_at timestamptz,
  emitido_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_afiliados_numero on public.afiliados(numero_afiliado);
create index if not exists idx_afiliados_email on public.afiliados(email);
create index if not exists idx_tests_afiliado on public.intentos_test(afiliado_id);
create index if not exists idx_certificados_afiliado on public.certificados(afiliado_id);
create index if not exists idx_certificados_codigo on public.certificados(codigo);

alter table public.afiliados enable row level security;
alter table public.intentos_test enable row level security;
alter table public.certificados enable row level security;

-- Las politicas publicas se anadiran junto con la autenticacion del area de administracion.
-- No se permite acceso anonimo directo a estas tablas por defecto.
