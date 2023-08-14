import { buildUrl } from '../utils/buildUrl'

export const RouteURLBase = {
  SITE: '/site',
  TRIAL: '/trial',
  PATIENT: '/patient',
  CRA: '/cra',
}

export const RouteURL = {
  LOGIN: '/login',
  SITE: RouteURLBase.SITE,
  SITE_TRIAL: buildUrl([RouteURLBase.SITE, RouteURLBase.TRIAL]),
  PATIENT: RouteURLBase.PATIENT,
  CRA: RouteURLBase.CRA,
}
