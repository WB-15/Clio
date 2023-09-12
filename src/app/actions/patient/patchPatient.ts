'use server'

import { FetchApiOptions } from '@/types'
import { patchApi, QueryKeyBase } from '@/query'
import { buildUrl } from '@/utils'
import { getAuthTokenFromServerComponent } from '@/utils/server'

type IPatchPatient = {
  first_name: string
  last_name: string
  patient_number: string
  phone: string
  email?: string
  status: string
}

export const patchPatient = <T>(
  trialId: string,
  patientId: string,
  data: IPatchPatient,
  fetchApiOptions?: FetchApiOptions
) => {
  const authToken = getAuthTokenFromServerComponent()
  return patchApi<T>(
    buildUrl([
      QueryKeyBase.SITE,
      QueryKeyBase.TRIAL,
      trialId,
      QueryKeyBase.PATIENT,
      patientId,
    ]),
    {
      ...fetchApiOptions,
      authToken,
      body: data,
    }
  )
}
