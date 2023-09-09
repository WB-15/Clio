import { FC } from 'react'

import { IVisitWindow } from '@/types/api'
import { formattedNumber } from '@/utils'
import EditVisitDialog from '../EditVisitDialog'

interface VisitWindowItemProps {
  visitWindow: IVisitWindow
  setVisitWindowsData: (value: IVisitWindow) => void
}

const getInfoBlock = (value: string) => (
  <div className="rounded-lg border border-neutral-100 bg-white px-3 py-1.5 text-center text-sm">
    {value}
  </div>
)

const VisitWindowItem: FC<VisitWindowItemProps> = (props) => {
  const { visitWindow, setVisitWindowsData } = props

  const date = visitWindow.visit_datetime

  const formattedData = date.format('DD MMM YYYY')
  const formattedTimeStart = date.format('HH:mm')
  const formattedTimeEnd = date
    .add(visitWindow.duration_minutes, 'minute')
    .format('HH:mm')

  const saveData = (value: IVisitWindow) => {
    setVisitWindowsData(value)
  }

  return (
    <div className="grid grid-cols-[70px_1fr_auto] items-center gap-x-4 rounded-lg border border-neutral-100 bg-neutral-50 py-2 pl-3 pr-2">
      <h4 className="truncate text-sm font-medium">{visitWindow.name}</h4>

      <div className="grid grid-flow-col content-start gap-x-1">
        {getInfoBlock(`Day ${visitWindow.visit_day}`)}
        {getInfoBlock(formattedData)}
        {getInfoBlock(`${formattedTimeStart}-${formattedTimeEnd}`)}
        {getInfoBlock(`${formattedNumber(visitWindow.duration_minutes / 60)}h`)}
      </div>

      <EditVisitDialog visitWindow={visitWindow} onConfirm={saveData} />
    </div>
  )
}

export default VisitWindowItem
