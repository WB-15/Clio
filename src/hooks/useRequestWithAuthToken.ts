import { QueryKey } from '@/query'
import { FetchApiOptions } from '@/types'

import { useFetchApiWithAuthToken } from './useFetchApiWithAuthToken'

export const useRequestWithAuthToken = () => {
  const { getApiClient } = useFetchApiWithAuthToken()

  const getMe = (fetchApiOptions?: FetchApiOptions) =>
    getApiClient(QueryKey.ME, fetchApiOptions)

  return { getMe }
}
