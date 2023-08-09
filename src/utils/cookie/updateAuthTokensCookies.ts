import Cookies from 'universal-cookie'

import { CookieKey } from '@/constants'

export const updateAuthTokensCookies = (token: string) => {
  const cookies = new Cookies()

  cookies.set(CookieKey.AUTH_TOKEN, JSON.stringify(token), {
    path: '/',
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
  })
}
