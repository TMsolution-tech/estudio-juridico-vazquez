# Vazquez Estudio Penal — Web

Sitio institucional del estudio jurídico penal. Next.js 16 + React 19 + Tailwind CSS v4 + Supabase. Deploy en Vercel.

## Estructura

- `src/app/page.tsx` — landing pública (hero, servicios, por qué elegirnos, novedades, contacto)
- `src/app/api/consultas/route.ts` — recibe el formulario: guarda en DB + avisa por mail
- `src/app/admin` — backoffice (`/admin` protegido por `src/proxy.ts`): CRUD de novedades con imágenes + bandeja de consultas
- `supabase/migrations/0001_init.sql` — schema (tablas `novedades`, `consultas`, bucket `novedades`, RLS)
- `legacy/` — sitio estático anterior (referencia)

## Setup

1. `npm install`
2. Crear proyecto en [supabase.com](https://supabase.com) y correr `supabase/migrations/0001_init.sql` en el SQL Editor.
3. En Supabase → Authentication → Users → **Add user**: crear el usuario admin (email + contraseña) para entrar a `/admin`.
4. Copiar `env.example` → `.env.local` y completar las keys (Project Settings → API). Para el aviso por mail, configurar `GMAIL_USER` + `GMAIL_APP_PASSWORD` (contraseña de aplicación de Gmail).
5. `npm run dev`

## Deploy en Vercel

1. Subir el repo a GitHub y conectarlo en Vercel.
2. Cargar las env vars en Vercel → Settings → Environment Variables (las mismas de `.env.local`, con `NEXT_PUBLIC_SITE_URL` apuntando al dominio final).
3. Deploy automático.

## Comandos

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` / `npm run typecheck` — verificación
