import { FC } from 'react'
import { getPatient } from '@/app/actions/patient'
import { IPatient } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { EmptyList } from '@/app/components'
import { PastVisit } from '../../components/PastVisit'
import { TabHeader } from '../../components/TabHeader'

interface PastProps {
  params: { id: string; patientId: string }
}
const Past: FC<PastProps> = async (props) => {
  const authToken = getAuthTokenFromServerComponent()
  const {
    params: { id, patientId },
  } = props
  const { data: patientData } = await getPatient<IPatient>(
    { trialId: id, patientId },
    { authToken }
  )

  return (
    <div className="pt-6">
      <TabHeader />
      {patientData?.visits?.filter((item) => item.status === 'completed')
        ?.length ? (
        <PastVisit
          visitData={
            patientData?.visits?.filter(
              (item) => item.status === 'completed'
            ) || []
          }
          patientName={`${patientData?.first_name} ${patientData?.last_name}`}
        />
      ) : (
        <EmptyList
          heading="No visits yet"
          description="You don’t have any visit yet, but it will populate as soon as visits are added."
          className="mt-6"
        />
      )}
    </div>
  )
}

export default Past
