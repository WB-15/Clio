import { RouteURL } from '@/constants'

export const getUserMainPath = ({
  isSiteUser,
  isPatient,
  isCra,
}: {
  isSiteUser: boolean
  isPatient: boolean
  isCra: boolean
}) => {
  switch (true) {
    case isSiteUser:
      return RouteURL.Site.UPCOMING_VISITS
    case isPatient:
      return RouteURL.Patient.UPCOMING_VISITS
    case isCra:
      return RouteURL.Cra.TRIALS
    default:
      return RouteURL.LOGIN
  }
}
