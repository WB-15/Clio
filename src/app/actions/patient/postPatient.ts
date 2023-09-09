'use server'

import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IPostPatient = {
  first_name: string
  last_name: string
  patient_number: string
  phone: string
  email: string
}

export const postPatient = <T>(
  data: IPostPatient,
  trailId: string,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trailId,
      QueryKeyBase.PATIENT,
    ]),
    {
      ...fetchApiOptions,
      body: data,
    }
  )
