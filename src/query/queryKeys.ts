import { buildUrl } from '@/utils'

const QueryKeyBase = {
  AUTH: '/auth',
}

export const QueryKey = {
  AUTH: QueryKeyBase.AUTH,
  VERIFY: buildUrl([QueryKeyBase.AUTH, '/verify']),
}
