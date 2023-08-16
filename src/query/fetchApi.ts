import { API_ENDPOINT } from '@/constants'
import { FetchApiOptions } from '@/types'
import { ApiResponse } from '@/types/api'

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

export const fetchApiWithStatusCode = async <T = any>(
  url: string,
  fetchApiOptions?: FetchApiOptions
) => {
  try {
    const response = await fetchApiNoJson(url, fetchApiOptions)
    const contentType = response.headers.get('content-type')

    const responseData: T =
      contentType && contentType.indexOf('application/json') !== -1
        ? await response.json()
        : await response.text()

    const apiResponse: ApiResponse<T> = {
      status: response.status,
      data: responseData,
    }

    return apiResponse
  } catch (error: any) {
    const apiResponse: ApiResponse<T> = {
      status: 500,
      error: error.message || 'An error occurred',
    }

    return apiResponse
  }
}

export const getApi = fetchApiWithStatusCode

export const postApi = (url: string, fetchApiOptions?: FetchApiOptions) => {
  return fetchApiWithStatusCode(url, {
    ...fetchApiOptions,
    method: 'POST',
  })
}
