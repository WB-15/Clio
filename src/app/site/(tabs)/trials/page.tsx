import React from 'react'

import { mergeMetadataWithDefault } from '@/utils/seo'
import { EmptyList, TrialList } from '@/app/components'
import { ITrial } from '@/types/api'
import { getTrialList } from '@/query'
import { RouteURLBase } from '@/constants'
import { getAuthTokenFromServerComponent } from '@/utils/server'

export const metadata = mergeMetadataWithDefault({ title: 'Trials' })

const TabTrials = async () => {
  const authToken = getAuthTokenFromServerComponent()

  const { data: trialList } = await getTrialList<ITrial[]>({
    authToken,
    options: { cache: 'no-cache' },
  })

  return trialList?.length ? (
    <TrialList
      trialList={trialList}
      baseUrl={RouteURLBase.SITE}
      className="mt-6"
    />
  ) : (
    <EmptyList
      heading="No trials yet"
      description="It is the best time to create a trial. Click the 'Create Trial' button to get started."
      className="mt-6"
    />
  )
}

export default TabTrials
