import { FC, ReactNode } from 'react'
import { getPatient } from '@/app/actions/patient'
import { TabNavLinksList } from '@/app/components'
import { ITabNavLink } from '@/types'
import { IPatient } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { PageHeader } from './components/PageHeader'

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

  return (
    <main className="pb-9">
      <div className="border-b border-neutral-200 bg-white">
        <div className="container px-9 pt-9">
          <PageHeader patientData={patientData} id={id} />
          <TabNavLinksList className="-mb-px mt-6" navLinks={Tabs} />
        </div>
      </div>
      <div className="container">{children}</div>
    </main>
  )
}

export default PatientDetail
