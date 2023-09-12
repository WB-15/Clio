'use client'

import dayjs from 'dayjs'
import { FC, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/navigation'
import { patchVisit } from '@/app/actions/visit/patchVisit'
import { IUpcomingVisit } from '@/types/api/upcomingVisit'
import { addToastToStack } from '@/utils'
import { UpcomingVisitItem } from './components'

interface UpcomingVisitProps {
  upcomingVisitList: IUpcomingVisit[]
  authToken: string
  patientName?: string
  isShowPatientDetail?: boolean
}

interface ParseData {
  [key: string]: IUpcomingVisit[]
}

export const UpcomingVisit: FC<UpcomingVisitProps> = ({
  upcomingVisitList,
  authToken,
  patientName,
  isShowPatientDetail,
}) => {
  const router = useRouter()
  const [upcomingVisitListParse, setUpcomingVisitListParse] =
    useState<ParseData>({})

  const parseData = useCallback(() => {
    const data = {} as ParseData
    upcomingVisitList.forEach((item) => {
      const visitDate = dayjs(item.visit_datetime).format('YYYY-MM-DD')
      if (!data[visitDate]) {
        data[visitDate] = []
      }
      data[visitDate].push(item)
    })
    return data
  }, [upcomingVisitList])

  useEffect(() => {
    const dataParse = parseData()
    setUpcomingVisitListParse(dataParse)
  }, [parseData, upcomingVisitList])

  const renderTitle = (visitDate: string) => {
    if (dayjs().isSame(visitDate, 'day')) return 'Today'
    const nextDay = dayjs().add(1, 'day')
    if (nextDay.isSame(visitDate, 'day')) return 'Tomorrow'

    return dayjs(visitDate).format('DD MMM')
  }

  const handleMarkVisitAsMissed = (visit: IUpcomingVisit) => {
    const request = patchVisit(
      visit.visit_id,
      visit.trial_id,
      visit.patient_id,
      {
        status: 'missed',
      },
      { authToken }
    )
    request.then((res) => {
      const hasError = res.status >= 400 && res.status <= 500

      if (hasError) {
        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: 'Something went wrong! Try again later',
        })

        return
      }
      router.refresh()
      addToastToStack({
        variant: 'success',
        title: 'Success',
        description: 'Visit has been changed successfully',
      })
    })
  }

  return (
    <div className="pt-6">
      {Object.keys(upcomingVisitListParse).map((key) => (
        <div key={uuid()} className="mb-[18px] flex flex-col">
          <h4 className="mb-[18px] truncate text-lg font-bold">
            {renderTitle(key)}
          </h4>
          <div className="flex flex-col gap-3">
            {upcomingVisitListParse[key].map((item) => (
              <div
                key={uuid()}
                className="flex justify-between rounded-xl border border-solid border-neutral-200 bg-white p-5"
              >
                <UpcomingVisitItem
                  visit={item}
                  handleMarkVisitAsMissed={() => handleMarkVisitAsMissed(item)}
                  patientName={patientName}
                  isShowPatientDetail={isShowPatientDetail}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
