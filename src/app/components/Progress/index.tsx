import React, { FC } from 'react'
import * as RadixProgress from '@radix-ui/react-progress'
import clsx from 'clsx'

interface ProgressProps {
  value: number
  variant?: 'success' | 'completed' | 'neutral'
}

export const Progress: FC<ProgressProps> = ({
  variant = 'success',
  value,
}: ProgressProps) => {
  return (
    <RadixProgress.Root
      className="h-2 w-24 overflow-hidden rounded bg-neutral-100"
      style={{
        transform: 'translateZ(0)',
      }}
      value={value}
    >
      <RadixProgress.Indicator
        className={clsx(
          'ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full rounded transition-transform duration-[660ms]',
          {
            'bg-green-500': variant === 'success',
            'bg-primary-200': variant === 'completed',
            'bg-neutral-400': variant === 'neutral',
          }
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </RadixProgress.Root>
  )
}
