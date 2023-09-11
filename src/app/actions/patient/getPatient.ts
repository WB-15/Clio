import { FetchApiOptions } from '@/types'
import { getApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'

type IGetPatient = {
  trialId: string
  patientId: string
}

export const getPatient = <T>(
  { patientId, trialId }: IGetPatient,
  fetchApiOptions?: FetchApiOptions
) =>
  getApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      QueryKeyBase.PATIENT,
      patientId,
    ]),
    fetchApiOptions
  )
