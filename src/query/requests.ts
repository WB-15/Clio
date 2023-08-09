import { QueryKey } from './queryKeys'
import { postApi } from './fetchApi'

type IPostUserAuth = { email: string }
type IPostUserAuthVerify = { email: string; code: string }

export const postUserAuth = ({ email }: IPostUserAuth) =>
  postApi(QueryKey.AUTH, { body: { email } })

export const postUserAuthVerify = ({ email, code }: IPostUserAuthVerify) =>
  postApi(QueryKey.VERIFY, { body: { email, code } })
