import { FC } from 'react'
import { Metadata } from 'next'

import { mergeMetadataWithDefault } from '@/utils/seo'
import { getTrial } from '@/query'
import { ITrialWithPatients } from '@/types/api'
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

  const { data } = await getTrial<ITrialWithPatients>(
    { trialId: id },
    {
      authToken: getAuthTokenFromServerComponent(),
    }
  )

  return <PatientsTable patients={data?.patients} />
}

export default TabPatientsList
