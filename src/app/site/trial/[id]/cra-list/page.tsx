import { Metadata } from 'next'

import { mergeMetadataWithDefault } from '@/utils/seo'
import { getTrial } from '@/app/actions/trial'
import { ITrialWithPatients } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'

import CraTable from './components/CraTable'

interface TabCraListProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: TabCraListProps): Promise<Metadata> {
  const { id } = params

  const { data } = await getTrial<ITrialWithPatients>(
    { trialId: id },
    {
      authToken: getAuthTokenFromServerComponent(),
    }
  )

  return mergeMetadataWithDefault({
    title: `${data?.name} - CRA lists` || 'CRA lists',
  })
}

const TabCraList = () => {
  return <CraTable />
}

export default TabCraList
