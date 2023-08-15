import { buildUrl } from '../utils/buildUrl'

export const RouteURLBase = {
  SITE: '/site',
  TRIAL: '/trial',
  PATIENT: '/patient',
  CRA: '/cra',
}

export const RouteURL = {
  LOGIN: '/login',
  Site: {
    UPCOMING_VISITS: RouteURLBase.SITE,
    TRIALS: buildUrl([RouteURLBase.SITE, '/trials']),
    TRIAL: buildUrl([RouteURLBase.SITE, RouteURLBase.TRIAL]),
  },
  PATIENT: RouteURLBase.PATIENT,
  CRA: RouteURLBase.CRA,
}
