/* eslint-disable consistent-return */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { CookieKey, RouteURL } from '@/constants'
import { jsonParseSafe } from '@/utils'

const handleProtectedRoute = (request: NextRequest) => {
  const authToken: string | null = jsonParseSafe(
    request.cookies.get(CookieKey.AUTH_TOKEN)?.value,
    null
  )

  if (authToken) return NextResponse.next()
  return NextResponse.redirect(new URL(RouteURL.LOGIN, request.url))
}

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith(RouteURL.SITE)) {
    const protectedRouteHandle = handleProtectedRoute(request)

    return protectedRouteHandle
  }
}
