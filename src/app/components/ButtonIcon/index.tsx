import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'

import { Icon } from '../Icon'

interface ButtonIconProps<T extends ElementType> {
  as?: T
  iconName: string
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
        'rounded-full border border-neutral-200 p-1.5 duration-300 ease-in-out hocus:bg-neutral-100',
        className
      )}
    >
      <Icon name={iconName} size={20} className={iconClassName} />
    </Component>
  )
}
