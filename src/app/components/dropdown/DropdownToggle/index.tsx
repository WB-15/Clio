import { ComponentProps, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import { DropdownMenuTrigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

interface DropdownToggleProps
  extends ComponentProps<typeof RadixDropdownMenuTrigger> {
  triggerContent: ReactNode
}

export const DropdownToggle = forwardRef<
  HTMLButtonElement,
  DropdownToggleProps
>((props, ref) => {
  const { triggerContent, className, ...rest } = props

  return (
    <RadixDropdownMenuTrigger {...rest} className={clsx(className)} ref={ref}>
      {triggerContent}
    </RadixDropdownMenuTrigger>
  )
})

DropdownToggle.displayName = 'DropdownToggle'
