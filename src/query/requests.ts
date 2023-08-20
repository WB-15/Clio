import { FetchApiOptions } from '@/types'
import { buildUrl } from '@/utils'

import { QueryKey, QueryKeyBase } from './queryKeys'
import { getApi, postApi } from './fetchApi'

type IPostUserAuth = { email: string }
type IPostUserAuthVerify = { email: string; code: string }

type IPostCreateTrial = {
  name: string
  contact_name: string
  contact_number: string
}

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

// Server queries
export const getTrialList = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.TRIAL_LIST, fetchApiOptions)

export const getCurrentUser = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.ME, fetchApiOptions)

export const postCreateTrial = <T>(
  data: IPostCreateTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  postApi<T>(buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL]), {
    ...fetchApiOptions,
    body: data,
  })

export const postVisitWindows = <T>(
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

// Pure client queries
export const postUserAuth = ({ email }: IPostUserAuth) =>
  postApi(QueryKey.AUTH, { body: { email } })

export const postUserAuthVerify = ({ email, code }: IPostUserAuthVerify) =>
  postApi(QueryKey.VERIFY, { body: { email, code } })
