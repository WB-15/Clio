import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { getPatient } from '@/app/actions/patient'
import {
  Button,
  ButtonIcon,
  Icon,
  PageHeader,
  TabNavLinksList,
} from '@/app/components'
import { PatientStatus, RouteURL } from '@/constants'
import { ITabNavLink } from '@/types'
import { IPatient } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'

interface PatientDetailProps {
  params: { id: string; patientId: string }
  children: ReactNode
}

const PatientDetail: FC<PatientDetailProps> = async (props) => {
  const {
    params: { id, patientId },
    children,
  } = props

  const { data: patientData } = await getPatient<IPatient>(
    { trialId: id, patientId },
    { authToken: getAuthTokenFromServerComponent() }
  )

  const Tabs: ITabNavLink[] = [
    {
      name: `Upcoming (${
        patientData?.visits?.filter((item) => item.status !== 'completed')
          .length || 0
      })`,
      url: `/site/trial/${id}/patients-list/${patientId}/upcoming`,
    },
    {
      name: `Past (${
        patientData?.visits?.filter((item) => item.status === 'completed')
          .length || 0
      })`,
      url: `/site/trial/${id}/patients-list/${patientId}/past`,
    },
  ]

  const renderStatus = () => {
    switch (patientData?.status) {
      case PatientStatus.ACTIVE:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-green-100 bg-green-50 px-2 py-1 text-[12px] font-medium uppercase text-green-200">
            {patientData?.status}
          </div>
        )

      case PatientStatus.COMPLETED:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-neutral-200 bg-neutral-100 px-2 py-1 text-[12px] font-medium uppercase text-neutral-400">
            {patientData?.status}
          </div>
        )

      case PatientStatus.WITHDRAWN:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-red-300 bg-[#FBEFEF] px-2 py-1 text-[12px] font-medium uppercase text-red-300">
            {patientData?.status}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="pb-9">
      <div className="border-b border-neutral-200 bg-white">
        <div className="container px-9 pt-9">
          <PageHeader
            breadcrumb={[
              { text: 'Trials', url: RouteURL.Site.TRIALS },
              {
                text: 'Trial Details',
                url: `${RouteURL.Site.TRIAL}/${id}/patients-list`,
              },
              {
                text: `${patientData?.first_name} ${patientData?.last_name}`,
                active: true,
              },
            ]}
            buttonSlotLeft={
              <ButtonIcon
                as={Link}
                href={`${RouteURL.Site.TRIAL}/${id}/patients-list`}
                iconName="icon-chevron_down"
                className="rotate-90"
                label="back"
              />
            }
            subTitle={
              <h4 className="-mb-2 text-sm font-medium text-neutral-900">
                <span className="text-sm text-neutral-400">#</span>
                {patientData?.patient_number}
              </h4>
            }
            bottomInfo={
              <div className="flex gap-4">
                <div className="flex gap-1.5">
                  <Icon name="icon-phone" size={20} />
                  <p className="text-sm">{patientData?.phone}</p>
                </div>
                <div className="flex gap-1.5">
                  <Icon name="icon-mail" size={20} />
                  <p className="text-sm">{patientData?.email}</p>
                </div>
              </div>
            }
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                {patientData?.first_name} {patientData?.last_name}
                {renderStatus()}
              </div>
              <Button
                iconSlotLeft={<Icon name="icon-note" size={20} />}
                variant="outline"
              >
                Edit patient details
              </Button>
            </div>
          </PageHeader>
          <TabNavLinksList className="-mb-px mt-6" navLinks={Tabs} />
        </div>
      </div>
      <div className="container">{children}</div>
    </main>
  )
}

export default PatientDetail
