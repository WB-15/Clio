import { fetchApiWithToken } from '@/query'

export const useFetchApiWithAuthToken = () => {
  const getApiClient = fetchApiWithToken

  return {
    getApiClient,
  }
}
