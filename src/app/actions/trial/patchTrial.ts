'use server'

import { FetchApiOptions } from '@/types'
import { patchApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'
import { getAuthTokenFromServerComponent } from '@/utils/server'

type IPatchTrial = {
  name?: string
  contact_name?: string
  contact_number?: string
}

export const patchTrial = <T>(
  trialId: string,
  data: IPatchTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  patchApi<T>(buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL, trialId]), {
    ...fetchApiOptions,
    body: data,
  })

export const patchTrialWithAuth = <T>(
  trialId: string,
  data: IPatchTrial,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromServerComponent()
  patchTrial<T>(trialId, data, {
    ...fetchApiOptions,
    authToken,
  })
}
