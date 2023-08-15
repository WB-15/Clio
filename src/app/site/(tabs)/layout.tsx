import { FC, ReactNode } from 'react'

import { PageHeader, TabNavLinksList } from '@/app/components'
import { RouteURL } from '@/constants'
import { getTrialList } from '@/query'
import { ITrial } from '@/types/api'
import { ITabNavLink } from '@/types/ui'
import { getAuthTokenFromServerComponent } from '@/utils/server'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async (props) => {
  const { children } = props

  const authToken = getAuthTokenFromServerComponent()

  const trialList = await getTrialList<ITrial[]>({
    authToken,
    options: { cache: 'no-cache' },
  })

  const SITE_SUBPAGES: ITabNavLink[] = [
    {
      name: 'Upcoming Visits',
      url: RouteURL.Site.UPCOMING_VISITS,
      prefetch: false,
    },
    {
      name: trialList.length ? `Trials (${trialList.length})` : 'Trials',
      url: RouteURL.Site.TRIALS,
      prefetch: false,
    },
  ]

  return (
    <main className="container min-w-[1024px] pb-28 pt-9">
      <PageHeader heading="Dashboard" />
      <TabNavLinksList navLinks={SITE_SUBPAGES} className="mt-6" />
      {children}
    </main>
  )
}

export default Layout
