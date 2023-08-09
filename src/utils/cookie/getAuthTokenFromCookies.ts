import Cookies from 'universal-cookie'

import { CookieKey } from '@/constants'

export const getAuthTokenFromCookies = () => {
  const cookies = new Cookies()

  return cookies.get(CookieKey.AUTH_TOKEN)
}
