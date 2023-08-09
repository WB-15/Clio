import Cookies from 'universal-cookie'

import { CookieKey } from '@/constants'

export const removeAuthTokensCookies = () => {
  const cookies = new Cookies()

  cookies.remove(CookieKey.AUTH_TOKEN, {
    path: '/',
  })
}
