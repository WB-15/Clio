'use client'

import { ComponentProps, FC } from 'react'
import { Control, useController } from 'react-hook-form'

import { WrappedSelect } from '../WrappedSelect'

type ControlledSelectProps = ComponentProps<typeof WrappedSelect> & {
  name: string
  control: Control<any>
}

export const ControlledSelect: FC<ControlledSelectProps> = (props) => {
  const { control, name, ...rest } = props

  const { field } = useController<Record<string, any>>({
    control,
    name,
  })

  return (
    <WrappedSelect
      {...rest}
      name={field.name}
      onChange={(newValue) => field.onChange(newValue)}
      onBlur={field.onBlur}
      // error={fieldState.error}
      value={field.value}
    />
  )
}
