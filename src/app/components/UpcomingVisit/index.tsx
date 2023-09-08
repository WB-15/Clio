'use client'

import dayjs from 'dayjs'
import { FC, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { patchVisit } from '@/app/actions/visit/patchVisit'
import { IUpcomingVisit } from '@/types/api/upcomingVisit'
import { addToastToStack } from '@/utils'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Status } from './components/Status'

interface UpcomingVisitProps {
  upcomingVisitList: IUpcomingVisit[]
  authToken: string
}

interface ParseData {
  [key: string]: IUpcomingVisit[]
}

export const UpcomingVisit: FC<UpcomingVisitProps> = ({
  upcomingVisitList,
  authToken,
}) => {
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
      const hasError = res.status >= 400 && res.status <= 499

      if (hasError) {
        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: 'Something went wrong! Try again later',
        })

        return
      }

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
                <div className="flex">
                  <div className="flex min-w-[82px] flex-col  gap-2">
                    <p className="text-[14px] leading-[14px] text-neutral-600">
                      {dayjs(item.visit_datetime).format('ddd, MMM D')}
                    </p>
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {item.visit_window_name}
                    </h3>
                  </div>
                  <div className="mx-6 h-[47px] w-[1px] bg-neutral-200" />
                  <div className="flex min-w-[197px] flex-col gap-1.5 pr-14">
                    <div className="flex items-center gap-1.5">
                      <Icon name="icon-clock" size={20} />
                      <span className="text-[14px] font-medium text-black">
                        {dayjs(item.visit_datetime).format('HH:mm')} -{' '}
                        {dayjs(item.visit_datetime)
                          .add(item.duration_minutes, 'minute')
                          .format('HH:mm')}
                      </span>
                      {item.status === 'pending' && (
                        <Icon name="icon-error" size={20} />
                      )}
                    </div>
                    <Status status={item.status} />
                  </div>
                  <div className="flex flex-col gap-1.5 pr-14">
                    <div className="flex items-center gap-1.5">
                      <Icon name="icon-trials" size={20} />
                      <span className="text-[14px] font-medium text-black">
                        {item.trial_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 pr-14">
                    <div className="flex items-center gap-1.5">
                      <Icon name="icon-patient" size={20} />
                      <span className="text-[14px] font-medium text-black">
                        {item.patient_first_name} {item.patient_last_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Icon name="icon-id" size={20} />
                      <span className="text-[14px] font-medium text-black">
                        {item.patient_number}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      {item.visit_type === 'remote' ? (
                        <Icon name="icon-phone" size={20} />
                      ) : (
                        <Icon name="icon-building" size={20} />
                      )}
                      <span className="text-[14px] font-medium capitalize text-black">
                        {item.visit_type}
                      </span>
                    </div>
                    {item.fasting && (
                      <div className="flex items-center gap-1.5">
                        <Icon name="icon-no-food" size={20} />
                        <span className="text-[14px] font-medium text-black">
                          Fasting
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  {item.status !== 'missed' && (
                    <Button
                      variant="outline-danger"
                      iconSlotRight={<Icon name="icon-missed" size={20} />}
                      onClick={() => handleMarkVisitAsMissed(item)}
                    >
                      Mark as missed
                    </Button>
                  )}
                  {item.status === 'pending' && (
                    <Button
                      type="submit"
                      variant="primary"
                      iconSlotRight={<Icon name="icon-respond" size={20} />}
                      className="min-w-[137px]"
                    >
                      Respond
                    </Button>
                  )}
                  {item.status === 'confirmed' && (
                    <Button
                      type="submit"
                      variant="outline"
                      iconSlotRight={<Icon name="icon-clock" size={20} />}
                      className="min-w-[137px]"
                    >
                      Reschedule
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
