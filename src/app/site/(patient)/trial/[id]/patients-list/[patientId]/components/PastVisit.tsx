'use client'

import dayjs from 'dayjs'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IUpcomingVisit } from '@/types/api/upcomingVisit'
import { UpcomingVisitItem } from '@/app/components/UpcomingVisit/components'

interface PastVisitProps {
  visitData: IUpcomingVisit[]
  patientName: string
}

interface ParseData {
  [key: string]: IUpcomingVisit[]
}

export const PastVisit: FC<PastVisitProps> = ({ visitData, patientName }) => {
  const [upcomingVisitListParse, setUpcomingVisitListParse] =
    useState<ParseData>({})

  const parseData = useCallback(() => {
    const data = {} as ParseData
    visitData.forEach((item) => {
      const visitDate = dayjs(item.visit_datetime).format('YYYY-MM')
      if (!data[visitDate]) {
        data[visitDate] = []
      }
      data[visitDate].push(item)
    })
    return data
  }, [visitData])

  useEffect(() => {
    const dataParse = parseData()
    setUpcomingVisitListParse(dataParse)
  }, [parseData, visitData])

  return (
    <div className="pt-6">
      {Object.keys(upcomingVisitListParse).map((key) => (
        <div key={uuid()} className="mb-[18px] flex flex-col">
          <h4 className="mb-[18px] truncate text-lg font-bold">
            {dayjs(key).format('MMMM')}
          </h4>
          <div className="flex flex-col gap-3">
            {upcomingVisitListParse[key].map((item) => (
              <div
                key={uuid()}
                className="flex justify-between rounded-xl border border-solid border-neutral-200 bg-white p-5"
              >
                <UpcomingVisitItem visit={item} patientName={patientName} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
