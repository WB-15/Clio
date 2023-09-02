import { FetchApiOptions } from '@/types'
import { buildUrl } from '@/utils'

import { QueryKey, QueryKeyBase } from './queryKeys'
import { getApi, postApi } from './fetchApi'

type IPostUserAuth = { email: string }
type IPostUserAuthVerify = { email: string; code: string }

type IGetTrial = {
  trialId: string
}

// Server queries
export const getTrialList = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.TRIAL_LIST, fetchApiOptions)

export const getCurrentUser = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.ME, fetchApiOptions)

export const getSiteConfiguration = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.SITE_CONFIGURATION, fetchApiOptions)

export const getTrial = <T>(
  { trialId }: IGetTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  getApi<T>(
    buildUrl([QueryKeyBase.SITE, QueryKeyBase.TRIAL, trialId]),
    fetchApiOptions
  )

export const getVisitWindows = <T>(
  { trialId }: IGetTrial,
  fetchApiOptions?: FetchApiOptions
) =>
  getApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      QueryKeyBase.VISIT_WINDOWS,
    ]),
    fetchApiOptions
  )

// Pure client queries
export const postUserAuth = ({ email }: IPostUserAuth) =>
  postApi(QueryKey.AUTH, { body: { email } })

export const postUserAuthVerify = ({ email, code }: IPostUserAuthVerify) =>
  postApi(QueryKey.VERIFY, { body: { email, code } })
