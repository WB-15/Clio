import { FC, ReactNode } from 'react'
import Link from 'next/link'

import { ButtonIcon, PageHeader, TabNavLinksList } from '@/app/components'
import { ITabNavLink } from '@/types'
import { RouteURL, RouteURLBase, RouteUrlSubPath } from '@/constants'
import { buildUrl } from '@/utils'
import { getTrial } from '@/query'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { ITrialWithPatients } from '@/types/api'

interface LayoutProps {
  params: { id: string }
  children: ReactNode
}

const Layout: FC<LayoutProps> = async (props) => {
  const {
    children,
    params: { id },
  } = props

  const { data } = await getTrial<ITrialWithPatients>(
    { trialId: id },
    { authToken: getAuthTokenFromServerComponent() }
  )

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
    <main className="pb-9">
      <div className="border-b border-neutral-200 bg-white">
        <div className="container px-9 pt-9">
          <PageHeader
            breadcrumb={[
              { text: 'Trials', url: RouteURL.Site.TRIALS },
              { text: 'Trial Details', active: true },
            ]}
            buttonSlotLeft={
              <ButtonIcon
                as={Link}
                href={RouteURL.Site.TRIALS}
                iconName="icon-chevron_down"
                className="rotate-90"
                label="back"
              />
            }
            buttonSlotRight={
              <ButtonIcon
                iconName="icon-settings"
                iconClassName="duration-300 ease-in-out group-hocus:rotate-90"
                className="group"
                label="open trial settings"
              />
            }
          >
            {data?.name || 'Trial name'}
          </PageHeader>
          <TabNavLinksList navLinks={TRIAL_PAGES} className="-mb-px mt-6" />
        </div>
      </div>
      <div className="container">{children}</div>
    </main>
  )
}

export default Layout
