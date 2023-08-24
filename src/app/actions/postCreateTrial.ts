'use server'

import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IPostCreateTrial = {
  name: string
  contact_name: string
  contact_number: string
}

export const postCreateTrial = <T>(
  data: IPostCreateTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL]), {
    ...fetchApiOptions,
    body: data,
  })
