import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Route Protection for /admin/*
  const isAdminLoginPage = pathname === '/admin/login'
  const isAdminRoute = pathname.startsWith('/admin')

  // Public auth routes (non-admin)
  const isPublicAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

  if (!user && isAdminRoute && !isAdminLoginPage) {
    // Not authenticated → redirect to admin login
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (user && isAdminLoginPage) {
    // Already authenticated → redirect to dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
  
  if (user && pathname === '/admin') {
    // Authenticated on root admin → redirect to dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  if (user && isPublicAuthRoute) {
    // Already authenticated on public auth pages → go home
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}
