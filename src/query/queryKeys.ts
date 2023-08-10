import { buildUrl } from '@/utils'

const QueryKeyBase = {
  AUTH: '/auth',
  USER: '/user',
}

export const QueryKey = {
  AUTH: QueryKeyBase.AUTH,
  VERIFY: buildUrl([QueryKeyBase.AUTH, '/verify']),
  ME: buildUrl([QueryKeyBase.USER, '/me']),
}
