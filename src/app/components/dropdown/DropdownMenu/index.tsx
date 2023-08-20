import { ComponentProps, forwardRef } from 'react'
import clsx from 'clsx'
import { DropdownMenuContent as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu'

interface DropdownMenuProps
  extends ComponentProps<typeof RadixDropdownMenuContent> {}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    const { children, className, ...rest } = props

    return (
      <RadixDropdownMenuContent
        {...rest}
        className={clsx(
          'dropdown-menu z-dropdown rounded-xl border border-neutral-100 bg-white p-1',
          className
        )}
        ref={ref}
      >
        {children}
      </RadixDropdownMenuContent>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'
