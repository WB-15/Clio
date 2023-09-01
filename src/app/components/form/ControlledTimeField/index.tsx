'use client'

import { ComponentProps, FC } from 'react'
import { Control, useController } from 'react-hook-form'

import { TimeField } from '../TimeField'

type ControlledTimeFieldProps = ComponentProps<typeof TimeField> & {
  name: string
  control: Control<any>
}

export const ControlledTimeField: FC<ControlledTimeFieldProps> = (props) => {
  const { control, name, errorMessage, ...rest } = props

  const { field } = useController<Record<string, any>>({
    control,
    name,
  })

  return (
    <TimeField
      {...rest}
      name={field.name}
      onChange={(newValue) => field.onChange(newValue)}
      onBlur={field.onBlur}
      value={field.value}
      errorMessage={errorMessage}
    />
  )
}
