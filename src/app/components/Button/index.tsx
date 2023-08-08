import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'

interface ButtonProps<T extends ElementType> {
  as?: T
  variant: 'primary'
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
}

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as = 'button',
    type = 'button',
    children,
    className,
    variant,
    disabled = false,
    isLoading = false,
    loadingText,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      {...rest}
      type={type}
      disabled={disabled || isLoading}
      data-disabled={disabled}
      data-loading={isLoading}
      className={clsx(
        'button flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium leading-3.5 duration-300 ease-out data-disabled:opacity-50',
        {
          'data-enabled:hocus:bg-primary bg-primary-500 text-white':
            variant === 'primary',
        },
        className
      )}
    >
      {isLoading ? (
        <span className="button-loading-text">{loadingText}</span>
      ) : (
        children
      )}
    </Component>
  )
}
