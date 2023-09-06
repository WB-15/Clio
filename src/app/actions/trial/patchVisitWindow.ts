'use server'

import { FetchApiOptions } from '@/types'
import { patchApi, QueryKeyBase } from '@/query'
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

type IPatchVisitWindows = {
  trialId: string
  visitWindowId: string
  data: IVisitWindow
}

export const patchVisitWindow = <T>(
  { trialId, visitWindowId, data }: IPatchVisitWindows,
  fetchApiOptions?: FetchApiOptions
) => {
  return patchApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      '/visit_window',
      visitWindowId,
    ]),
    { ...fetchApiOptions, body: data }
  )
}
export const patchVisitWindowWithAuth = <T>(
  data: IPatchVisitWindows,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromServerComponent()

  return patchVisitWindow<T>(
    { ...data },
    { ...fetchApiOptions, body: data, authToken }
  )
}
