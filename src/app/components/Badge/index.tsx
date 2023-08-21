import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  variant?: 'default' | 'danger'
  children: ReactNode
}

export const Badge: FC<BadgeProps> = (props) => {
  const { children, variant = 'default' } = props

  return (
    <div
      className={clsx('rounded-lg border px-2 py-[3px] text-sm font-normal', {
        'border-neutral-100 bg-neutral-50': variant === 'default',
        'border-red-300 bg-red-50 text-red-300': variant === 'danger',
      })}
    >
      {children}
    </div>
  )
}
