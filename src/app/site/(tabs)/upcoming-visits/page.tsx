import React, { FC } from 'react'

import { EmptyList } from '@/app/components'
import { mergeMetadataWithDefault } from '@/utils/seo'

export const metadata = mergeMetadataWithDefault({ title: 'Upcoming Visits' })

interface TabUpcomingVisitsProps {}

const TabUpcomingVisits: FC<TabUpcomingVisitsProps> = () => {
  return (
    <EmptyList
      heading="No upcoming visits yet"
      description="You don’t have any upcoming visit yet, but it will populate as soon as visits are added."
      className="mt-6"
    />
  )
}

export default TabUpcomingVisits
