import { buildUrl } from '../utils/buildUrl'

export const RouteUrlSubPath = {
  TRIALS: '/trials',
  UPCOMING_VISITS: '/upcoming-visits',
  TRIAL: '/trial',
  PATIENTS_LIST: '/patients-list',
  CRA_LIST: '/cra-list',
}

export const RouteURLBase = {
  SITE: '/site',
  PATIENT: '/patient',
  CRA: '/cra',
}

export const RouteURL = {
  LOGIN: '/login',
  Site: {
    UPCOMING_VISITS: buildUrl([
      RouteURLBase.SITE,
      RouteUrlSubPath.UPCOMING_VISITS,
    ]),
    TRIALS: buildUrl([RouteURLBase.SITE, RouteUrlSubPath.TRIALS]),
    TRIAL: buildUrl([RouteURLBase.SITE, RouteUrlSubPath.TRIAL]),
    // Trial: {
    //   PATIENT_LIST: buildUrl([
    //     RouteURLBase.SITE,
    //     RouteUrlSubPath.TRIAL,
    //     RouteUrlSubPath.PATIENTS_LIST,
    //   ]),
    //   CRA_LIST: buildUrl([
    //     RouteURLBase.SITE,
    //     RouteUrlSubPath.TRIAL,
    //     RouteUrlSubPath.CRA_LIST,
    //   ]),
    // },
  },
  Patient: {
    UPCOMING_VISITS: buildUrl([
      RouteURLBase.PATIENT,
      RouteUrlSubPath.UPCOMING_VISITS,
    ]),
  },
  Cra: { TRIALS: buildUrl([RouteURLBase.CRA, RouteUrlSubPath.TRIALS]) },
}
