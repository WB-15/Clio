'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CookieKey, RouteURL } from '@/constants'

export const clearAuthCookiesAndRedirect = async () => {
  cookies().delete(CookieKey.AUTH_TOKEN)
  redirect(RouteURL.LOGIN)
}
