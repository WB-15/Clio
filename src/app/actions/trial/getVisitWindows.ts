import { FetchApiOptions } from '@/types'
import { getApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IGetVisitWindow = {
  trialId: string
}

export const getVisitWindows = <T>(
  { trialId }: IGetVisitWindow,
  fetchApiOptions?: FetchApiOptions
) =>
  getApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      QueryKeyBase.VISIT_WINDOWS,
    ]),
    fetchApiOptions
  )
