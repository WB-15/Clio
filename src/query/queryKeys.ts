import { buildUrl } from '@/utils'

export const QueryKeyBase = {
  AUTH: '/auth',
  USER: '/user',
  SITE: '/site/site_pcDyVS7XKSfx',
  TRIAL: '/trial',
}

export const QueryKey = {
  AUTH: QueryKeyBase.AUTH,
  VERIFY: buildUrl([QueryKeyBase.AUTH, '/verify']),
  ME: buildUrl([QueryKeyBase.USER, '/me']),
  TRIAL_LIST: buildUrl([QueryKeyBase.SITE, '/trials']),
}
