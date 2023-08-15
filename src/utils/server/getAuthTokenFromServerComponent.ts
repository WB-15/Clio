import { cookies } from 'next/headers'

import { CookieKey } from '@/constants'
import { jsonParseSafe } from '@/utils'

export const getAuthTokenFromServerComponent = (): string => {
  return jsonParseSafe(cookies().get(CookieKey.AUTH_TOKEN)?.value, null)
}
