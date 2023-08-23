import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  variant?: 'default' | 'danger' | 'success' | 'completed' | 'neutral'
  size?: 'default' | 'small'
  children: ReactNode
}

export const Badge: FC<BadgeProps> = (props) => {
  const { children, variant = 'default', size = 'default' } = props

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center rounded-lg border px-2',
        {
          'border-neutral-100 bg-neutral-50': variant === 'default',
          'border-red-300 bg-red-50 text-red-300': variant === 'danger',
          'border-green-100 bg-green-50 text-green-200': variant === 'success',
          'border-neutral-200 bg-neutral-50 text-neutral-400':
            variant === 'neutral',
          'border-primary-30 bg-primary-10 text-primary-200':
            variant === 'completed',
        },
        {
          'h-7 text-sm font-normal': size === 'default',
          'h-5 text-xs font-medium': size === 'small',
        }
      )}
    >
      {children}
    </div>
  )
}
