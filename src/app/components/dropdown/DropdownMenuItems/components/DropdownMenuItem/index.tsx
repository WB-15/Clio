import { ComponentProps, FC } from 'react'
import { DropdownMenuItem as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import { IUIDropdownItemBasic } from '@/types'

import { Icon } from '../../../../Icon'

type DropdownMenuItemProps = Omit<
  ComponentProps<typeof RadixDropdownMenuItem>,
  'onSelect'
> &
  IUIDropdownItemBasic & {
    iconName?: string
    onSelect?: (eventKey: string) => void
  }

const DropdownMenuItem: FC<DropdownMenuItemProps> = (props) => {
  const {
    text,
    iconName,
    onSelect,
    eventKey,
    as: ItemComponent,
    href,
    variant = 'default',
    ...rest
  } = props

  return (
    <RadixDropdownMenuItem
      {...rest}
      onSelect={() => onSelect?.(eventKey)}
      asChild
    >
      <ItemComponent
        href={href}
        title={text}
        className={clsx(
          'flex items-center gap-2 rounded-lg border border-white bg-white px-2 py-1.5 text-sm duration-300 ease-in-out',
          {
            'hocus:border-neutral-200 hocus:bg-neutral-100':
              variant === 'default',
            'hocus:border-red-100 hocus:bg-red-50': variant === 'danger',
          }
        )}
      >
        {!!iconName && (
          <Icon
            name={iconName}
            size={24}
            className={clsx({ 'text-red-300': variant === 'danger' })}
          />
        )}
        <span
          className={clsx('truncate', { 'text-red-300': variant === 'danger' })}
        >
          {text}
        </span>
      </ItemComponent>
    </RadixDropdownMenuItem>
  )
}

export default DropdownMenuItem
