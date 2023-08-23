import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps<T extends ElementType> {
  as?: T
  variant: 'primary' | 'outline' | 'outline-danger'
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  iconSlotLeft?: ReactNode
  iconSlotRight?: ReactNode
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
    iconSlotLeft,
    iconSlotRight,
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
        'button group relative flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium leading-3.5 duration-300 ease-out',
        {
          'data-enabled:hocus:bg-primary bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-900 disabled:bg-primary-50':
            variant === 'primary',
          'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-300':
            variant === 'outline',
          'border border-red-300 bg-white text-red-300 hover:bg-red-50 focus:bg-red-100 disabled:border-red-100 disabled:bg-white disabled:text-red-100':
            variant === 'outline-danger',
        },
        {
          'pl-4': !iconSlotLeft,
          'pr-4': !iconSlotRight,
          'pl-10': iconSlotLeft,
          'pr-10': iconSlotRight,
        },
        className
      )}
    >
      {isLoading ? (
        <span className="button-loading-text">{loadingText}</span>
      ) : (
        children
      )}

      {iconSlotLeft && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          {iconSlotLeft}
        </span>
      )}

      {iconSlotRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {iconSlotRight}
        </span>
      )}
    </Component>
  )
}
