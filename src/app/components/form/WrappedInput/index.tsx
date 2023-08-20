import { ComponentPropsWithoutRef, forwardRef, ReactNode, useId } from 'react'
import clsx from 'clsx'

import { InputLabel } from '../InputLabel'
import { OptionalErrorMessage } from '../OptionalErrorMessage'

interface WrappedInputProps extends ComponentPropsWithoutRef<'input'> {
  labelContent?: string
  classNameGroup?: string
  classNameWrapper?: string
  errors?: any
  errorMessage?: string
  isErrorStyleForced?: boolean
  absoluteError?: boolean
  iconSlotLeft?: ReactNode
  iconSlotRight?: ReactNode
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
      errorMessage,
      isErrorStyleForced,
      absoluteError = false,
      iconSlotLeft,
      iconSlotRight,
      ...rest
    } = props

    const fallbackId = useId()
    const id = idProp || `input-${fallbackId}`

    const fieldErrorMessage =
      errorMessage || (name ? errors?.[name]?.message : null)
    const isErrorStyleActive = fieldErrorMessage || isErrorStyleForced

    return (
      <div
        className={clsx(
          'relative grid min-w-0',
          { 'pb-[26px]': absoluteError },
          classNameGroup
        )}
      >
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
                ? 'border-red-600'
                : 'border-neutral-200 hover:border-neutral-400 focus:border-primary-500',
              {
                'pl-4': !iconSlotLeft,
                'pr-4': !iconSlotRight,
                'pl-11': iconSlotLeft,
                'pr-11': iconSlotRight,
              }
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

          {iconSlotLeft && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              {iconSlotLeft}
            </span>
          )}

          {iconSlotRight && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {iconSlotRight}
            </span>
          )}
        </div>
        <OptionalErrorMessage
          className={clsx('mt-1.5', {
            'absolute bottom-0 left-0 ': absoluteError,
          })}
          errorText={fieldErrorMessage}
        />
      </div>
    )
  }
)

WrappedInput.displayName = 'WrappedInput'
