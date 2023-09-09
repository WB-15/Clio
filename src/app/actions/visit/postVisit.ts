'use server'

import dayjs from 'dayjs'
import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IVisit = {
  visit_window_id: string
  visit_datetime: dayjs.Dayjs
}

export const postVisit = <T>(
  data: IVisit[],
  trailId: string,
  patientId: string,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trailId,
      QueryKeyBase.PATIENT,
      patientId,
      '/visits',
    ]),
    {
      ...fetchApiOptions,
      body: data,
    }
  )
