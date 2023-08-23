import { FC } from 'react'
import dayjs from 'dayjs'

import { Icon } from '../Icon'

interface VisitTagProps {
  data: string
}

export const VisitTag: FC<VisitTagProps> = (props) => {
  const { data } = props

  const formattedData = dayjs(data).format('MMM DD at hh:mm')

  return (
    <div className="inline-flex h-8 items-center gap-x-1.5 rounded border border-neutral-100 bg-neutral-50 px-1.5 ">
      <Icon name="icon-clock" size={20} className="text-neutral-400" />
      {formattedData}
    </div>
  )
}
