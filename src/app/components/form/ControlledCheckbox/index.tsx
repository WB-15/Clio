'use client'

import { ComponentProps, FC } from 'react'
import { Control, useController } from 'react-hook-form'
import { CheckedState } from '@radix-ui/react-checkbox'

import { WrappedCheckbox } from '../WrappedCheckbox'

interface ControlledCheckboxProps
  extends ComponentProps<typeof WrappedCheckbox> {
  control: Control<any>
}

export const ControlledCheckbox: FC<ControlledCheckboxProps> = (props) => {
  const { control, name = '', ...rest } = props

  const { field, fieldState } = useController<Record<string, CheckedState>>({
    control,
    name,
  })

  return (
    <WrappedCheckbox
      {...rest}
      name={field.name}
      onCheckedChange={(newValue) => field.onChange(newValue)}
      onBlur={field.onBlur}
      ref={field.ref}
      error={fieldState.error}
      checked={field.value}
    />
  )
}
