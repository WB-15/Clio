import { FC, ReactNode } from 'react'
import Link from 'next/link'

import { ButtonIcon, PageHeader, TabNavLinksList } from '@/app/components'
import { ITabNavLink } from '@/types'
import {
  RouteURL,
  RouteURLBase,
  RouteUrlSubPath,
  TYPE_OF_VISITS,
} from '@/constants'
import { buildUrl } from '@/utils'
import { getTrial, getVisitWindows } from '@/app/actions/trial'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { ITrialWithPatients, IVisitWindow } from '@/types/api'

import CreateTrialDialog from '../../components/CreateTrialDialog'

interface LayoutProps {
  params: { id: string }
  children: ReactNode
}

const Layout: FC<LayoutProps> = async (props) => {
  const {
    children,
    params: { id },
  } = props

  const { data: trialData } = await getTrial<ITrialWithPatients>(
    { trialId: id },
    { authToken: getAuthTokenFromServerComponent() }
  )

  const { data: visitWindowsData } = await getVisitWindows<IVisitWindow[]>(
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

  const visitWindows =
    visitWindowsData?.map(
      ({
        visit_window_id,
        name,
        visit_day,
        window_after_days,
        window_before_days,
        duration_minutes,
        visit_type,
        fasting,
      }) => {
        const isSeparateVisitWindow = window_after_days !== window_before_days

        const visitTypeSelectObject = TYPE_OF_VISITS.find(
          ({ value }) => value === visit_type
        )

        return {
          visit_window_id,
          name,
          visit_day,
          separate_visit_window: isSeparateVisitWindow,
          window_buffer: isSeparateVisitWindow ? undefined : window_before_days,
          window_before_days: isSeparateVisitWindow
            ? window_before_days
            : undefined,
          window_after_days: isSeparateVisitWindow
            ? window_after_days
            : undefined,
          duration_minutes,
          visit_type: visitTypeSelectObject,
          fasting,
        }
      }
    ) || ([{}] as any)

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
              <CreateTrialDialog
                trialId={trialData?.trial_id}
                requestType="patch"
                trigger={
                  <ButtonIcon
                    iconName="icon-settings"
                    iconClassName="duration-300 ease-in-out group-hocus:rotate-90"
                    className="group"
                    label="open trial settings"
                  />
                }
                defaultValues={{
                  name: trialData?.name,
                  contact_name: trialData?.contact_name,
                  contact_number: trialData?.contact_number,
                  visit_windows: visitWindows,
                }}
              />
            }
          >
            {trialData?.name || 'Trial name'}
          </PageHeader>
          <TabNavLinksList navLinks={TRIAL_PAGES} className="-mb-px mt-6" />
        </div>
      </div>
      <div className="container">{children}</div>
    </main>
  )
}

export default Layout
