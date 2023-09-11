import React, { FC } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { IUpcomingVisit } from '@/types/api/upcomingVisit'
import { Icon } from '../../Icon'
import { Status } from './Status'
import { Button } from '../../Button'

interface UpcomingVisitItemProps {
  visit: IUpcomingVisit
  handleMarkVisitAsMissed?: () => void
  patientName?: string
  isShowPatientDetail?: boolean
}

export const UpcomingVisitItem: FC<UpcomingVisitItemProps> = ({
  visit,
  handleMarkVisitAsMissed,
  patientName,
  isShowPatientDetail,
}) => {
  return (
    <>
      <div className="flex">
        <div className="flex min-w-[82px] flex-col  gap-2">
          <p className="text-[14px] leading-[14px] text-neutral-600">
            {dayjs(visit.visit_datetime).format('ddd, MMM D')}
          </p>
          <h3 className="text-2xl font-medium leading-6 text-black">
            {visit.visit_window_name}
          </h3>
        </div>
        <div className="mx-6 h-[47px] w-[1px] bg-neutral-200" />
        <div className="flex min-w-[197px] flex-col gap-1.5 pr-14">
          <div className="flex items-center gap-1.5">
            <Icon name="icon-clock" size={20} />
            <span className="text-[14px] font-medium text-black">
              {dayjs(visit.visit_datetime).format('HH:mm')} -{' '}
              {dayjs(visit.visit_datetime)
                .add(visit.duration_minutes, 'minute')
                .format('HH:mm')}
            </span>
            {visit.status === 'pending' && <Icon name="icon-error" size={20} />}
          </div>
          <Status status={visit.status} />
        </div>
        <div className="flex flex-col gap-1.5 pr-14">
          <div className="flex items-center gap-1.5">
            <Icon name="icon-trials" size={20} />
            <span className="text-[14px] font-medium text-black">
              {visit.trial_name}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 pr-14">
          <div className="flex items-center gap-1.5">
            <Icon name="icon-patient" size={20} />
            <span className="text-[14px] font-medium text-black">
              {patientName ||
                `${visit.patient_first_name}
                        ${visit.patient_last_name}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Icon name="icon-id" size={20} />
            {isShowPatientDetail ? (
              <Link
                className="text-[14px] font-medium text-black"
                href={`/site/trial/${visit.trial_id}/patients-list/${visit.patient_id}/upcoming`}
              >
                {visit.patient_number}
              </Link>
            ) : (
              <span className="text-[14px] font-medium text-black">
                {visit.patient_number}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            {visit.visit_type === 'remote' ? (
              <Icon name="icon-phone" size={20} />
            ) : (
              <Icon name="icon-building" size={20} />
            )}
            <span className="text-[14px] font-medium capitalize text-black">
              {visit.visit_type}
            </span>
          </div>
          {visit.fasting && (
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
        {visit.status !== 'missed' && visit.status !== 'completed' && (
          <Button
            variant="outline-danger"
            iconSlotRight={<Icon name="icon-missed" size={20} />}
            onClick={handleMarkVisitAsMissed}
          >
            Mark as missed
          </Button>
        )}
        {visit.status === 'pending' && (
          <Button
            type="submit"
            variant="primary"
            iconSlotRight={<Icon name="icon-respond" size={20} />}
            className="min-w-[137px]"
          >
            Respond
          </Button>
        )}
        {visit.status === 'confirmed' && (
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
    </>
  )
}
