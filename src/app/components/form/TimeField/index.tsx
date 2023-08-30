/* eslint-disable react/no-array-index-key */

import { FC, ReactNode, useRef } from 'react'
import { AriaTimeFieldProps, useLocale, useTimeField } from 'react-aria'
import { useTimeFieldState } from 'react-stately'
import clsx from 'clsx'

import { Icon } from '@/app/components'

import DateSegment from './components/DateSegment'

interface TimeFieldProps extends AriaTimeFieldProps<any> {
  inputSlotLeft?: ReactNode
  hideLabel?: boolean
  className?: string
}

export const TimeField: FC<TimeFieldProps> = (props) => {
  const { label, inputSlotLeft, hideLabel, className } = props
  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    locale,
  })

  const ref = useRef(null)
  const { labelProps, fieldProps } = useTimeField(props, state, ref)

  return (
    <div className={clsx('grid gap-y-1.5 text-sm', className)}>
      {label && !hideLabel && <span {...labelProps}>{label}</span>}
      <div
        {...fieldProps}
        ref={ref}
        className="flex h-9 items-center rounded-lg border border-neutral-200 px-2.5 duration-300 ease-in-out focus-within:border-primary-500 hover:border-neutral-400 focus-within:hover:border-primary-500"
      >
        {inputSlotLeft && (
          <span className="flex-grow text-xs text-neutral-400" {...labelProps}>
            {inputSlotLeft}
          </span>
        )}
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        <Icon
          name="icon-clock"
          size={20}
          className={clsx(
            'justify-self-end text-black',
            inputSlotLeft ? 'ml-1.5' : 'ml-auto'
          )}
        />
      </div>
    </div>
  )
}
