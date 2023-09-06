import React, { FC, ReactNode } from 'react'

import { PageHeader, TabNavLinksList } from '@/app/components'
import { RouteURL } from '@/constants'
import { getTrialList } from '@/query'
import { ITrial } from '@/types/api'
import { ITabNavLink } from '@/types/ui'
import { getAuthTokenFromServerComponent } from '@/utils/server'

import CreateTrialDialog from '../components/CreateTrialDialog'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async (props) => {
  const { children } = props

  const authToken = getAuthTokenFromServerComponent()

  const { data: trialList } = await getTrialList<ITrial[]>({
    authToken,
  })

  const SITE_PAGES: ITabNavLink[] = [
    {
      name: 'Upcoming Visits',
      url: RouteURL.Site.UPCOMING_VISITS,
    },
    {
      name: trialList?.length ? `Trials (${trialList?.length})` : 'Trials',
      url: RouteURL.Site.TRIALS,
    },
  ]

  return (
    <main className="container py-9">
      <PageHeader
        buttonSlotRight={<CreateTrialDialog />}
        headerWrapperClassName="justify-between"
      >
        Dashboard
      </PageHeader>
      <TabNavLinksList navLinks={SITE_PAGES} className="mt-6" />
      {children}
    </main>
  )
}

export default Layout
