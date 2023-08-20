import { ComponentProps, FC, ReactNode } from 'react'
import {
  AccordionItem as RadixAccordionItem,
  AccordionHeader as RadixAccordionHeader,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from '@radix-ui/react-accordion'
import clsx from 'clsx'

import { CustomDropdown } from '@/app/components/dropdown'
import { CustomDropdownProps } from '@/types'

import { Badge } from '../Badge'
import { Icon } from '../Icon'

interface AccordionItemProps extends ComponentProps<typeof RadixAccordionItem> {
  triggerChildren: ReactNode
  headerClassName?: string
  contentClassName?: string
  badges?: { key: string; value: ReactNode }[]
  dropdownProps?: CustomDropdownProps
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    triggerChildren,
    children,
    contentClassName,
    headerClassName,
    badges,
    dropdownProps,
    className,
    ...rest
  } = props
  return (
    <RadixAccordionItem
      {...rest}
      className={clsx('border-b border-neutral-200', className)}
    >
      <RadixAccordionHeader asChild className={headerClassName}>
        <h4 className="flex">
          <RadixAccordionTrigger className="group flex w-full items-center justify-between gap-3 pb-4 pr-5 text-sm font-medium">
            <span>{triggerChildren}</span>

            {badges && (
              <div className="flex gap-3">
                {badges.map(({ key, value }) => (
                  <Badge key={key}>{value}</Badge>
                ))}
              </div>
            )}
          </RadixAccordionTrigger>
          {dropdownProps && <CustomDropdown {...dropdownProps} />}
          <RadixAccordionTrigger className="group pb-4 pl-1">
            <Icon
              name="icon-chevron_down"
              size={24}
              className="group-data-open:rotate-x-180 duration-300 ease-in-out"
            />
          </RadixAccordionTrigger>
        </h4>
      </RadixAccordionHeader>
      <RadixAccordionContent
        className={clsx(
          'accordion-content overflow-hidden pb-4',
          contentClassName
        )}
      >
        {children}
      </RadixAccordionContent>
    </RadixAccordionItem>
  )
}
