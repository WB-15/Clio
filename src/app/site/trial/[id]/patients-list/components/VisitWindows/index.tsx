import { FC } from 'react'
import { IVisitWindow } from '@/types/api'

import VisitWindowItem from './components/VisitWindowItem'

interface VisitWindowsProps {
  visitWindows: IVisitWindow[]
  setVisitWindowsData: (value: IVisitWindow) => void
}

const VisitWindows: FC<VisitWindowsProps> = (props) => {
  const { visitWindows, setVisitWindowsData } = props

  return (
    <div className="grid gap-y-2">
      {visitWindows.map((visitWindow) => (
        <VisitWindowItem
          key={visitWindow.visit_window_id}
          visitWindow={visitWindow}
          setVisitWindowsData={setVisitWindowsData}
        />
      ))}
    </div>
  )
}

export default VisitWindows
