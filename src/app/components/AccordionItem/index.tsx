import { ComponentProps, FC, ReactNode } from 'react'
import {
  AccordionItem as RadixAccordionItem,
  AccordionHeader as RadixAccordionHeader,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from '@radix-ui/react-accordion'
import clsx from 'clsx'

import { Badge } from '../Badge'
import { Icon } from '../Icon'

interface AccordionItemProps extends ComponentProps<typeof RadixAccordionItem> {
  triggerChildren: ReactNode
  headerClassName?: string
  contentClassName?: string
  badges?: { key: string; value: ReactNode }[]
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    triggerChildren,
    children,
    contentClassName,
    headerClassName,
    badges,
    className,
    ...rest
  } = props
  return (
    <RadixAccordionItem
      {...rest}
      className={clsx('border-b border-neutral-200', className)}
    >
      <RadixAccordionHeader asChild className={headerClassName}>
        <h4>
          <RadixAccordionTrigger className="group flex w-full grid-flow-col items-center gap-6 pb-4 text-sm font-medium">
            <span className="flex-grow text-start">{triggerChildren}</span>

            {badges && (
              <div className="flex gap-3">
                {badges.map(({ key, value }) => (
                  <Badge key={key}>{value}</Badge>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Icon name="icon-more" size={24} />
              <Icon
                name="icon-chevron_down"
                size={24}
                className="group-data-open:rotate-x-180 duration-300 ease-in-out"
              />
            </div>
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
