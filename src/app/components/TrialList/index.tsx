import { FC } from 'react'
import clsx from 'clsx'

import { ITrial } from '@/types/api'
import Trial from './components/Trial'

interface TrialListProps {
  trialList: ITrial[]
  baseUrl: string
  className?: string
}

export const TrialList: FC<TrialListProps> = (props) => {
  const { trialList, baseUrl, className } = props

  return (
    <div
      className={clsx(
        'grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4',
        className
      )}
    >
      {trialList.map(({ trial_id, name, patient_count }) => (
        <Trial
          key={trial_id}
          id={trial_id}
          heading={name}
          patientCount={patient_count}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  )
}
