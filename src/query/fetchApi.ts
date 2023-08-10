import { API_ENDPOINT } from '@/constants'
import { FetchApiOptions } from '@/types'
import { getAuthTokenFromCookies } from '@/utils/cookie'

//
// Server or client w/o auth fetch APIs starts here
//

export const fetchApiNoJson = (
  url: string,
  fetchApiOptions?: FetchApiOptions
) => {
  const { options, body, urlSearchParams, method, authToken } =
    fetchApiOptions || {}

  // 1. Compose URL and add URL search params if any
  const endpointUrl = `${API_ENDPOINT}${url}`

  const urlSearchParamsEncoded = urlSearchParams
    ? new URLSearchParams(urlSearchParams)
    : null

  const urlWithSearchParams = urlSearchParamsEncoded
    ? `${endpointUrl}?${urlSearchParamsEncoded}`
    : endpointUrl

  // 2. Compose body if any
  const optionsWithEncodedBody = body
    ? {
        body: JSON.stringify(body),
      }
    : {}

  const optionsHeadersContentType: Record<string, string> = body
    ? { 'Content-Type': 'application/json' }
    : {}

  const optionsHeadersAuth: Record<string, string> = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : {}

  // Send a request
  return fetch(urlWithSearchParams, {
    // Rest options
    ...options,

    credentials: 'same-origin',

    // Method
    method,

    // Headers
    headers: {
      // Content-Type: json header
      ...optionsHeadersContentType,

      // Authorization header
      ...optionsHeadersAuth,

      // Rest headers
      ...options?.headers,
    },

    // Encoded body
    ...optionsWithEncodedBody,
  })
}

export const fetchApi = <T = any>(
  url: string,
  fetchApiOptions?: FetchApiOptions
) =>
  fetchApiNoJson(url, fetchApiOptions).then((res) => {
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1)
      return res.json() as T
    return res.text() as T
  })

export const postApi = (url: string, fetchApiOptions?: FetchApiOptions) => {
  return fetchApi(url, {
    ...fetchApiOptions,
    method: 'POST',
  })
}

export const fetchApiWithToken = (
  url: string,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromCookies()

  return fetchApi(url, {
    ...fetchApiOptions,
    authToken,
  })
}
