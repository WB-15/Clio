import { FC } from 'react'

import dayjs from 'dayjs'
import { EmptyList, UpcomingVisit } from '@/app/components'
import { getUpcomingList } from '@/query'
import { IUpcomingVisit } from '@/types/api/upcomingVisit'
import { mergeMetadataWithDefault } from '@/utils/seo'
import { getAuthTokenFromServerComponent } from '@/utils/server'

export const metadata = mergeMetadataWithDefault({ title: 'Upcoming Visits' })

interface TabUpcomingVisitsProps {}

const TabUpcomingVisits: FC<TabUpcomingVisitsProps> = async () => {
  const authToken = getAuthTokenFromServerComponent()
  const currentDate = dayjs()

  const { data: upcomingVisitList } = await getUpcomingList<IUpcomingVisit[]>({
    authToken,
  })

  const upcomingNextSevenDay = upcomingVisitList?.filter((item) => {
    const sevenDaysLater = currentDate.add(7, 'day')
    return dayjs(item.visit_datetime).isBefore(sevenDaysLater)
  })

  return upcomingNextSevenDay?.length ? (
    <UpcomingVisit
      upcomingVisitList={upcomingNextSevenDay}
      authToken={authToken}
      isShowPatientDetail
    />
  ) : (
    <EmptyList
      heading="No upcoming visits yet"
      description="You don’t have any upcoming visit yet, but it will populate as soon as visits are added."
      className="mt-6"
    />
  )
}

export default TabUpcomingVisits
