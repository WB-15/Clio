import { FC } from 'react'
import { IVisitWindow } from '@/types/api'

import VisitWindowItem from './components/VisitWindowItem'

interface VisitWindowsProps {
  visitWindows: IVisitWindow[]
}

const VisitWindows: FC<VisitWindowsProps> = (props) => {
  const { visitWindows } = props

  return (
    <div className="grid gap-y-2">
      {visitWindows.map((visitWindow) => (
        <VisitWindowItem
          key={visitWindow.visit_window_id}
          visitWindow={visitWindow}
        />
      ))}
    </div>
  )
}

export default VisitWindows
