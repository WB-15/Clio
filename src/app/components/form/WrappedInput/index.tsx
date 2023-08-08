import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'
import clsx from 'clsx'

import { InputLabel } from '../InputLabel'
import { OptionalErrorMessage } from '../OptionalErrorMessage'

interface WrappedInputProps extends ComponentPropsWithoutRef<'input'> {
  labelContent?: string
  classNameGroup?: string
  classNameWrapper?: string
  errors?: any
  isErrorStyleForced?: boolean
}

export const WrappedInput = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      id: idProp,
      name,
      type,
      placeholder,
      labelContent,
      classNameGroup,
      classNameWrapper,
      errors,
      isErrorStyleForced,
      ...rest
    } = props

    const fallbackId = useId()
    const id = idProp || `input-${fallbackId}`

    const fieldErrorMessage = name ? errors?.[name]?.message : null
    const isErrorStyleActive = fieldErrorMessage || isErrorStyleForced

    return (
      <div className={clsx('relative grid min-w-0 pb-[26px]', classNameGroup)}>
        {!!labelContent && <InputLabel htmlFor={id}>{labelContent}</InputLabel>}
        <div className={clsx('relative grid min-w-0', classNameWrapper)}>
          <input
            id={id}
            name={name}
            type={type}
            ref={ref}
            placeholder={placeholder}
            className={clsx(
              'peer min-w-0 rounded-lg border px-2.5 py-1.5 duration-300 ease-out placeholder:opacity-0',
              isErrorStyleActive
                ? 'border-red-400'
                : 'border-neutral-200 hocus:border-primary-500'
            )}
            {...rest}
          />
          <span
            className={clsx(
              'pointer-events-none invisible absolute inset-x-2.5 top-1/2 inline-block -translate-y-1/2 select-none truncate text-sm text-neutral-400 transition-colors duration-300 ease-in-out peer-placeholder-shown:visible peer-enabled:peer-focus:invisible'
            )}
          >
            {placeholder}
          </span>
        </div>
        <OptionalErrorMessage
          className="absolute bottom-0 left-0 mt-1.5"
          errorText={fieldErrorMessage}
        />
      </div>
    )
  }
)

WrappedInput.displayName = 'WrappedInput'
