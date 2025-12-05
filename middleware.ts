import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JWT_COOKIE } from './lib/server/config'

function isStaticAsset(pathname: string) {
  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon') || pathname.startsWith('/public/')) return true
  // Allow all common static file extensions
  return /(\.png|\.jpg|\.jpeg|\.gif|\.svg|\.ico|\.webp|\.css|\.js|\.map|\.txt|\.xml|\.json)$/i.test(pathname)
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup'
  const isAuthApi = pathname.startsWith('/api/auth/')
  const isPageView = pathname.startsWith('/p')
  const isStatic = isStaticAsset(pathname)

  const token = req.cookies.get(JWT_COOKIE)?.value


  if (!token) {
    if (isAuthPage || isAuthApi || isStatic || isPageView) {
      return NextResponse.next()
    }
    const url = req.nextUrl.clone()
    url.pathname = '/auth/signin'

    if (pathname && pathname !== '/') url.searchParams.set('from', pathname)

    const legacy = searchParams.toString()
    if (legacy) url.searchParams.set('q', legacy)
    return NextResponse.redirect(url)
  }


  if (token && isAuthPage) {
    const url = req.nextUrl.clone()
    url.pathname = '/pages'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/((?!_next/static).*)'],
}
