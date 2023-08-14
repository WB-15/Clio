/* eslint-disable consistent-return */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { CookieKey, RouteURL } from '@/constants'
import { jsonParseSafe } from '@/utils'
import { getCurrentUser } from '@/query'
import { IUser } from '@/types/api'

const handleRedirect = (request: NextRequest, redirectUrl: string) => {
  const { pathname } = request.nextUrl

  return pathname.startsWith(redirectUrl)
    ? NextResponse.next()
    : NextResponse.redirect(new URL(redirectUrl, request.url))
}

const handleProtectedRoute = async (request: NextRequest) => {
  const authToken: string | null = jsonParseSafe(
    request.cookies.get(CookieKey.AUTH_TOKEN)?.value,
    null
  )

  if (!authToken) return handleRedirect(request, RouteURL.LOGIN)

  const currentUser = await getCurrentUser<IUser>({ authToken })

  switch (true) {
    case currentUser.is_site_user:
      return handleRedirect(request, RouteURL.SITE)

    case currentUser.is_cra:
      return handleRedirect(request, RouteURL.CRA)

    case currentUser.is_patient:
      return handleRedirect(request, RouteURL.PATIENT)

    default:
      return NextResponse.next()
  }
}

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith(RouteURL.LOGIN) ||
    pathname.startsWith(RouteURL.SITE) ||
    pathname.startsWith(RouteURL.PATIENT) ||
    pathname.startsWith(RouteURL.CRA)
  ) {
    const protectedRouteHandle = await handleProtectedRoute(request)

    return protectedRouteHandle
  }
}
