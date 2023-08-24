import { FC } from 'react'
import clsx from 'clsx'

import { Icon } from '../Icon'

interface EmptyListProps {
  heading: string
  description: string
  iconName?: string
  className?: string
}

export const EmptyList: FC<EmptyListProps> = (props) => {
  const { heading, description, iconName, className } = props

  return (
    <div
      className={clsx(
        'grid justify-items-center rounded-md border border-neutral-100 bg-white px-2.5 py-12 text-center',
        className
      )}
    >
      <Icon
        name={iconName || 'icon-inbox'}
        size={48}
        className="text-neutral-400"
      />
      <h2 className="mt-4 max-w-[280px] text-lg font-bold text-neutral-900">
        {heading}
      </h2>
      <p className="mt-2 max-w-[280px] text-sm text-neutral-600">
        {description}
      </p>
    </div>
  )
}
