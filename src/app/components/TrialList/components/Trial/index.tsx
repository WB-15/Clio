import { FC } from 'react'
import Link from 'next/link'

import { Icon } from '../../../Icon'

interface TrialProps {
  id: string
  heading: string
  patientCount: number
  baseUrl: string
}

const Trial: FC<TrialProps> = (props) => {
  const { id, baseUrl, heading, patientCount } = props

  const trialUrl = `${baseUrl}/${id}`

  return (
    <Link
      href={trialUrl}
      className="flex flex-col rounded-xl border border-neutral-100 bg-white p-4 duration-300 ease-in-out hocus:shadow-trialCard"
    >
      <h2 className="flex-grow text-lg font-medium text-neutral-900">
        {heading}
      </h2>
      <div className="mt-1 text-xs text-neutral-400">{id}</div>
      <div className="mt-4 grid grid-cols-[28px_auto] items-center gap-x-1.5 rounded-lg border-neutral-100 bg-neutral-50 px-3 py-2.5 text-neutral-900">
        <Icon name="icon-people" size={28} className="text-primary-500" />
        <div className="text-2xl leading-9">{patientCount}</div>
        <div className="col-span-full text-sm">Patient count</div>
      </div>
    </Link>
  )
}

export default Trial
