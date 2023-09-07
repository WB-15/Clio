import { QueryKeyBase, patchApi } from '@/query'
import { FetchApiOptions } from '@/types'
import { buildUrl } from '@/utils'

type IPatchVisit = {
  status: string
}

export const patchVisit = <T>(
  visitId: string,
  trialId: string,
  patientId: string,
  data: IPatchVisit,
  fetchApiOptions?: FetchApiOptions
) => {
  return patchApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      `/trial/${trialId}/patient/${patientId}/visit/${visitId}`,
    ]),
    {
      ...fetchApiOptions,
      body: data,
    }
  )
}
