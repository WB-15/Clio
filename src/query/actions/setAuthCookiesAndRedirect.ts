'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CookieKey } from '@/constants'

export const setAuthCookiesAndRedirect = async (
  token: string,
  redirectPath: string
) => {
  cookies().set(CookieKey.AUTH_TOKEN, JSON.stringify(token), {
    path: '/',
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
  })
  redirect(redirectPath)
}
