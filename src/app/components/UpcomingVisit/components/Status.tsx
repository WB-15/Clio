import React, { FC } from 'react'
import { VisitStatus } from '@/types/api/upcomingVisit'
import { Icon } from '../../Icon'

interface StatusProps {
  status: VisitStatus
}

const MissedStatus = () => {
  return (
    <div className="flex w-[70px] items-center gap-0.5 rounded-lg border border-solid border-red-300 bg-[#FBEFEF]">
      <Icon name="icon-missed" size={20} />
      <p className="text-[12px] font-medium text-red-300">Missed</p>
    </div>
  )
}

const PendingStatus = () => {
  return (
    <div className="flex w-[75px] items-center gap-0.5 rounded-lg border border-solid border-[#F7DDC5] bg-[#FDF6EF]">
      <Icon name="icon-pending" size={20} />
      <p className="text-[12px] font-medium text-[#DA904D]">Pending</p>
    </div>
  )
}

const ConfirmStatus = () => {
  return (
    <div className="flex w-[90px] items-center gap-0.5 rounded-lg border border-solid border-green-100 bg-[#EBF4EE]">
      <Icon name="icon-confirm" size={20} />
      <p className="text-[12px] font-medium text-green-200">Confirmed</p>
    </div>
  )
}

export const Status: FC<StatusProps> = ({ status }) => {
  if (status === 'missed') return <MissedStatus />
  if (status === 'pending') return <PendingStatus />
  if (status === 'confirmed') return <ConfirmStatus />

  return null
}
