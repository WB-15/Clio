import { FetchApiOptions } from '@/types'
import { getApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IGetTrial = {
  trialId: string
}

export const getTrial = <T>(
  { trialId }: IGetTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  getApi<T>(
    buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL, trialId]),
    fetchApiOptions
  )
