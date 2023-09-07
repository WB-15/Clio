import { buildUrl } from '@/utils'

export const QueryKeyBase = {
  AUTH: '/auth',
  USER: '/user',
  SITE: '/site/site_pcDyVS7XKSfx',
  TRIAL: '/trial',
  VISIT_WINDOWS: '/visit_windows',
}

export const QueryKey = {
  AUTH: QueryKeyBase.AUTH,
  VERIFY: buildUrl([QueryKeyBase.AUTH, '/verify']),
  ME: buildUrl([QueryKeyBase.USER, '/me']),
  TRIAL_LIST: buildUrl([QueryKeyBase.SITE, '/trials']),
  SITE_CONFIGURATION: QueryKeyBase.SITE,
  SITE_UPCOMING_VISIT: buildUrl([QueryKeyBase.SITE, '/upcoming_visits']),
}
