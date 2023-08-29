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
      {visitWindows.map((visitWindow, i) => (
        <VisitWindowItem
          key={visitWindow.visit_window_id}
          visitWindow={visitWindow}
          prevVisitWindow={visitWindows[i - 1]}
          nextVisitWindow={visitWindows[i + 1]}
        />
      ))}
    </div>
  )
}

export default VisitWindows
