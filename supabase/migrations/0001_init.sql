-- Vázquez Estudio Penal — schema inicial
-- Ejecutar en el SQL Editor del proyecto Supabase nuevo.

create table novedades (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  texto text not null,
  categoria text not null default 'Aviso',
  imagen_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index novedades_created_idx on novedades (created_at desc);

create table consultas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  asunto text,
  mensaje text not null,
  leida boolean not null default false,
  created_at timestamptz not null default now()
);

create index consultas_created_idx on consultas (created_at desc);

-- Bucket público para imágenes de novedades
insert into storage.buckets (id, name, public)
values ('novedades', 'novedades', true);

-- RLS ------------------------------------------------------------
alter table novedades enable row level security;
alter table consultas enable row level security;

-- Lectura pública (anon): solo novedades publicadas
create policy novedades_public_read on novedades
  for select to anon using (is_published);

-- Las consultas se insertan desde la API con service role (bypassea RLS).
-- El dueño (usuario autenticado) tiene acceso total a todo.
create policy novedades_admin_all on novedades
  for all to authenticated using (true) with check (true);
create policy consultas_admin_all on consultas
  for all to authenticated using (true) with check (true);

-- Storage: lectura pública del bucket, escritura solo autenticada
create policy novedades_img_public_read on storage.objects
  for select to public using (bucket_id = 'novedades');
create policy novedades_img_admin_write on storage.objects
  for insert to authenticated with check (bucket_id = 'novedades');
create policy novedades_img_admin_update on storage.objects
  for update to authenticated using (bucket_id = 'novedades');
create policy novedades_img_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'novedades');

-- Usuario admin: crear en Dashboard → Authentication → Users → Add user
-- (email + contraseña). Con eso ya puede entrar a /admin.
