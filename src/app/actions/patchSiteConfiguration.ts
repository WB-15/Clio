'use server'

import { FetchApiOptions } from '@/types'
import { patchApi, QueryKeyBase } from '@/query'
import { ISiteConfiguration } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'

export const patchSiteConfiguration = <T>(
  data: ISiteConfiguration,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromServerComponent()

  return patchApi<T>(QueryKeyBase.SITE, {
    ...fetchApiOptions,
    body: data,
    authToken,
  })
}
