'use server'

import { FetchApiOptions } from '@/types'
import { postApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'
import { getAuthTokenFromServerComponent } from '@/utils/server'

type IVisitWindow = {
  name: string
  visit_day: number
  window_before_days: number
  window_after_days: number
  duration_minutes: number
  visit_type: string
  fasting: boolean
}

type IPostVisitWindows = {
  trialId: string
  data: IVisitWindow[]
}

export const postVisitWindows = <T>(
  { trialId, data }: IPostVisitWindows,
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

export const postVisitWindowsWithAuth = <T>(
  { trialId, data }: IPostVisitWindows,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromServerComponent()

  return postVisitWindows<T>(
    { trialId, data },
    { ...fetchApiOptions, authToken }
  )
}
