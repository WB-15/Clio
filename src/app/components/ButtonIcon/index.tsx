import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'

import { Icon } from '../Icon'

interface ButtonIconProps<T extends ElementType> {
  as?: T
  iconName: string
  label: string
  variant?: 'button' | 'default'
  iconClassName?: string
  disabled?: boolean
}

export const ButtonIcon = <T extends ElementType = 'button'>(
  props: ButtonIconProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonIconProps<T>>
) => {
  const {
    as = 'button',
    type = 'button',
    variant = 'button',
    label,
    iconName,
    iconClassName,
    disabled = false,
    className,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      {...rest}
      type={type}
      disabled={disabled}
      data-disabled={disabled}
      className={clsx(
        'duration-150 ease-in-out',
        {
          '-m-1 p-1': variant === 'default',
          'rounded-full border border-neutral-200 p-1.5 duration-300 ease-in-out hocus:bg-neutral-100':
            variant === 'button',
        },
        className
      )}
      title={label}
      aria-label={label}
    >
      <Icon name={iconName} size={20} className={iconClassName} />
    </Component>
  )
}
