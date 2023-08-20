'use client'

import { ComponentProps, FC } from 'react'
import { Control, useController } from 'react-hook-form'

import { WrappedSwitch } from '../WrappedSwitch'

interface ControlledSwitchProps extends ComponentProps<typeof WrappedSwitch> {
  control: Control<any>
}

export const ControlledSwitch: FC<ControlledSwitchProps> = (props) => {
  const { control, name = '', ...rest } = props

  const { field } = useController<Record<string, boolean>>({
    control,
    name,
  })

  return (
    <WrappedSwitch
      {...rest}
      name={field.name}
      onCheckedChange={(newValue) => field.onChange(newValue)}
      onBlur={field.onBlur}
      ref={field.ref}
      checked={field.value}
    />
  )
}
