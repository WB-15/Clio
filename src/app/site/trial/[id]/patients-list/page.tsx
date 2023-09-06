import { FC } from 'react'
import { Metadata } from 'next'

import { mergeMetadataWithDefault } from '@/utils/seo'
import { getVisitWindows, getTrial } from '@/app/actions/trial'
import { ITrialWithPatients, IVisitWindow } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import PatientsTable from './components/PatientsTable'

interface TabPatientsListProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: TabPatientsListProps): Promise<Metadata> {
  const { id } = params

  const { data } = await getTrial<ITrialWithPatients>(
    { trialId: id },
    {
      authToken: getAuthTokenFromServerComponent(),
    }
  )

  return mergeMetadataWithDefault({
    title: `${data?.name} - Patient lists` || 'Patient lists',
  })
}

const TabPatientsList: FC<TabPatientsListProps> = async (props) => {
  const {
    params: { id },
  } = props

  const authToken = getAuthTokenFromServerComponent()

  const { data: trialResponse } = await getTrial<ITrialWithPatients>(
    {
      trialId: id,
    },
    { authToken }
  )

  const { data: visitWindowsResponse } = await getVisitWindows<IVisitWindow[]>(
    { trialId: id },
    {
      authToken,
    }
  )

  return (
    <PatientsTable
      patients={trialResponse?.patients}
      visitWindows={visitWindowsResponse}
    />
  )
}

export default TabPatientsList
