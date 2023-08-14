import { FC } from 'react'
import clsx from 'clsx'
import { Icon } from '@/app/components'

interface EmptyListProps {
  heading: string
  description: string
  className?: string
}

const EmptyList: FC<EmptyListProps> = (props) => {
  const { heading, description, className } = props

  return (
    <div
      className={clsx(
        'grid justify-items-center rounded-md border border-neutral-100 bg-white px-2.5 py-12 text-center',
        className
      )}
    >
      <Icon name="icon-inbox" size={48} className="text-neutral-400" />
      <h2 className="mt-4 max-w-[280px] text-lg font-bold text-neutral-900">
        {heading}
      </h2>
      <p className="mt-2 max-w-[280px] text-sm text-neutral-600">
        {description}
      </p>
    </div>
  )
}

export default EmptyList
