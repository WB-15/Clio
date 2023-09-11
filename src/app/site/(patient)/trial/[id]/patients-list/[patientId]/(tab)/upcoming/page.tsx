import { getPatient } from '@/app/actions/patient'
import { IPatient } from '@/types/api'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { EmptyList, UpcomingVisit } from '@/app/components'
import { TabHeader } from '../../components/TabHeader'

interface UpcomingProps {
  params: { id: string; patientId: string }
}

const Upcoming = async (props: UpcomingProps) => {
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
      {patientData?.visits?.filter((item) => item.status !== 'completed')
        ?.length ? (
        <UpcomingVisit
          upcomingVisitList={
            patientData?.visits?.filter(
              (item) => item.status !== 'completed'
            ) || []
          }
          authToken={authToken}
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

export default Upcoming
