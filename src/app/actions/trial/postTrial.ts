'use server'

import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IPostTrial = {
  name?: string
  contact_name?: string
  contact_number?: string
}

export const postTrial = <T>(
  data: IPostTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL]), {
    ...fetchApiOptions,
    body: data,
  })
