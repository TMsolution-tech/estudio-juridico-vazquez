import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Refresca la sesión y protege /admin.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Sin credenciales (dev local sin .env.local) dejamos pasar:
  // el admin igualmente no puede autenticarse ni leer datos.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return response

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  if (!user && path.startsWith('/admin') && path !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  if (user && path === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
