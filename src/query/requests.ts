import { FetchApiOptions } from '@/types'

import { QueryKey } from './queryKeys'
import { getApi, postApi } from './fetchApi'

type IPostUserAuth = { email: string }
type IPostUserAuthVerify = { email: string; code: string }

// Server queries
export const getTrialList = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.TRIAL_LIST, fetchApiOptions)

export const getCurrentUser = <T>(fetchApiOptions?: FetchApiOptions) =>
  getApi<T>(QueryKey.ME, fetchApiOptions)

// Pure client queries
export const postUserAuth = ({ email }: IPostUserAuth) =>
  postApi(QueryKey.AUTH, { body: { email } })

export const postUserAuthVerify = ({ email, code }: IPostUserAuthVerify) =>
  postApi(QueryKey.VERIFY, { body: { email, code } })
