import { FC, ReactNode } from 'react'

import { TabNavLinksList } from '@/app/components'
import { ITabNavLink } from '@/types'
import { RouteURLBase, RouteUrlSubPath } from '@/constants'
import { buildUrl } from '@/utils'

interface LayoutProps {
  params: { id: string }
  children: ReactNode
}

const Layout: FC<LayoutProps> = async (props) => {
  const {
    children,
    params: { id },
  } = props

  const TRIAL_PAGES: ITabNavLink[] = [
    {
      name: 'Patients list',
      url: buildUrl([
        RouteURLBase.SITE,
        RouteUrlSubPath.TRIAL,
        id,
        RouteUrlSubPath.PATIENTS_LIST,
      ]),
    },
    {
      name: 'CRA list',
      url: buildUrl([
        RouteURLBase.SITE,
        RouteUrlSubPath.TRIAL,
        id,
        RouteUrlSubPath.CRA_LIST,
      ]),
    },
  ]

  return (
    <main className="container py-9">
      <TabNavLinksList navLinks={TRIAL_PAGES} />
      {children}
    </main>
  )
}

export default Layout
