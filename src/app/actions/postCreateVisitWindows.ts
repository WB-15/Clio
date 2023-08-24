'use server'

import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IVisitWindow = {
  name: string
  visit_day: number
  window_before_days: number
  window_after_days: number
  duration_minutes: number
  visit_type: string
  fasting: boolean
}

type IPostCreateVisitWindows = {
  trialId: string
  data: IVisitWindow[]
}

export const postCreateVisitWindows = <T>(
  { trialId, data }: IPostCreateVisitWindows,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      '/visit_windows',
    ]),
    { ...fetchApiOptions, body: data }
  )
