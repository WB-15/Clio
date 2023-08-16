/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { ComponentProps, forwardRef, ReactNode, useId } from 'react'
import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

import * as Checkbox from '@radix-ui/react-checkbox'

import { Icon } from '../../Icon'

interface WrappedCheckboxProps extends ComponentProps<typeof Checkbox.Root> {
  label: ReactNode
  classNameWrapper?: string
  error?: FieldError
}

export const WrappedCheckbox = forwardRef<
  HTMLButtonElement,
  WrappedCheckboxProps
>((props, ref) => {
  const {
    id: idProp,
    name,
    label,
    classNameWrapper,
    className,
    error,
    ...rest
  } = props

  const fallbackId = useId()
  const id = idProp || `checkbox-${fallbackId}`

  return (
    <div className={clsx('flex items-center', classNameWrapper)}>
      <Checkbox.Root
        {...rest}
        name={name}
        id={id}
        className={clsx(
          'grid h-4.5 w-4.5 shrink-0 place-items-center rounded-sm border border-neutral-200 duration-300 ease-out data-checked:border-primary-500 data-checked:bg-primary-500 data-unchecked:hocus:bg-neutral-50',
          className
        )}
        ref={ref}
      >
        <Checkbox.Indicator asChild>
          <Icon name="icon-tick" size={16} className="text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id} className="pl-2 text-sm">
        {label}
      </label>
    </div>
  )
})

WrappedCheckbox.displayName = 'WrappedCheckbox'
