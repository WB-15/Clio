import { FC } from 'react'
import OTPInput from 'react-otp-input'
import { Control, useController } from 'react-hook-form'
import clsx from 'clsx'

import { InputLabel, OptionalErrorMessage } from '@/app/components/form'

interface WrappedOtpInputProps {
  name: string
  control: Control<any>
  labelContent?: string
  errors?: any
  isErrorStyleForced?: boolean
}

const WrappedOtpInput: FC<WrappedOtpInputProps> = (props) => {
  const { name, control, labelContent, errors, isErrorStyleForced } = props

  const { field } = useController<Record<string, string>>({
    control,
    name,
  })

  const fieldErrorMessage = name ? errors?.[name]?.message : null
  const isErrorStyleActive = fieldErrorMessage || isErrorStyleForced

  return (
    <div className="relative pb-[26px]">
      {!!labelContent && <InputLabel>{labelContent}</InputLabel>}
      <OTPInput
        inputType="tel"
        value={field.value}
        onChange={field.onChange}
        shouldAutoFocus
        renderInput={(inputProps) => (
          <input
            {...inputProps}
            className={clsx(
              'flex-1 rounded-lg border border-neutral-200 p-3 text-sm text-neutral-900 duration-300 ease-out',
              isErrorStyleActive
                ? 'border-red-600'
                : 'border-neutral-200 hover:border-neutral-300 focus:border-primary-500'
            )}
          />
        )}
        containerStyle="gap-2 mt-8"
      />
      <OptionalErrorMessage
        className="absolute bottom-0 left-0 mt-1.5"
        errorText={fieldErrorMessage}
      />
    </div>
  )
}

export default WrappedOtpInput
