'use client'

import React, { FC } from 'react'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'

import { TabsList } from '@/app/components'
import { SiteTabs } from '@/constants'
import { IUITab } from '@/types'
import TrialList from '@/app/components/TrialList'
import { ITrial } from '@/types/api'
import EmptyList from '@/app/components/EmptyList'

interface SiteTabsContentProps {
  trialList: ITrial[]
  className?: string
}

const SiteTabsContent: FC<SiteTabsContentProps> = (props) => {
  const { trialList, className } = props

  const SITE_TABS: IUITab[] = [
    { value: SiteTabs.UPCOMING_VISITS, text: 'Upcoming visits' },
    {
      value: SiteTabs.TRIALS,
      text: trialList.length ? `Trials (${trialList.length})` : `Trials`,
    },
  ]

  return (
    <Tabs defaultValue={SiteTabs.UPCOMING_VISITS} className={className}>
      <TabsList tabs={SITE_TABS} />
      <TabsContent value={SiteTabs.UPCOMING_VISITS}>
        <EmptyList
          heading="No upcoming visits yet"
          description="You don’t have any upcoming visit yet, but it will populate as soon as visits are added."
          className="mt-6"
        />
      </TabsContent>
      <TabsContent value={SiteTabs.TRIALS}>
        {trialList?.length ? (
          <TrialList trialList={trialList} className="mt-6" />
        ) : (
          <EmptyList
            heading="No trials yet"
            description="It is the best time to create a trial. Click the 'Create Trial' button to get started."
            className="mt-6"
          />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default SiteTabsContent
