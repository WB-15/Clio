import { FC } from 'react'
import dayjs from 'dayjs'

import { IVisitWindow } from '@/types/api'
import EditVisitDialog from '../EditVisitDialog'

interface VisitWindowItemProps {
  visitWindow: IVisitWindow
}

const getInfoBlock = (value: string) => (
  <div className="flex items-center rounded-lg border border-neutral-100 bg-white px-3 py-1.5 text-center text-sm">
    {value}
  </div>
)

const VisitWindowItem: FC<VisitWindowItemProps> = (props) => {
  const { visitWindow } = props

  const date = dayjs(visitWindow.created).add(visitWindow.visit_day, 'days')
  const formattedData = date.format('MM.DD.YYYY')
  const formattedTimeStart = date.format('hh:mm')
  const formattedTimeEnd = date
    .add(visitWindow.duration_minutes, 'minute')
    .format('hh:mm')

  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-lg border border-neutral-100 bg-neutral-50 py-2 pl-3 pr-2">
      <h4 className="truncate text-sm font-medium">{visitWindow.name}</h4>

      <div className="grid grid-flow-col gap-x-1">
        {getInfoBlock(`Day ${visitWindow.visit_day}`)}
        {getInfoBlock(formattedData)}
        {getInfoBlock(`${formattedTimeStart}-${formattedTimeEnd}`)}
      </div>

      <EditVisitDialog visitWindow={visitWindow} />
    </div>
  )
}

export default VisitWindowItem
