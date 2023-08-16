import { ComponentProps, FC, ReactNode } from 'react'
import {
  AccordionItem as RadixAccordionItem,
  AccordionHeader as RadixAccordionHeader,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from '@radix-ui/react-accordion'

import { Badge } from '../Badge'
import { Icon } from '../Icon'

interface AccordionItemProps extends ComponentProps<typeof RadixAccordionItem> {
  triggerChildren: ReactNode
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const { triggerChildren, children, ...rest } = props
  return (
    <RadixAccordionItem {...rest} className="border-b border-neutral-200">
      <RadixAccordionHeader asChild>
        <h4>
          <RadixAccordionTrigger className="group flex w-full grid-flow-col items-center gap-6 pb-4 text-sm font-medium">
            <span className="flex-grow text-start">{triggerChildren}</span>

            <div className="flex gap-3">
              <Badge>
                Day: <span className="font-medium">24</span>
              </Badge>
              <Badge>
                Window: <span className="font-medium">5</span>
              </Badge>
            </div>

            <div className="flex gap-2">
              <Icon name="icon-more" size={24} />
              <Icon
                name="icon-chevron_down"
                size={24}
                className="duration-300 ease-in-out group-data-open:-rotate-180"
              />
            </div>
          </RadixAccordionTrigger>
        </h4>
      </RadixAccordionHeader>
      <RadixAccordionContent className="accordion-content overflow-hidden pb-4">
        {children}
      </RadixAccordionContent>
    </RadixAccordionItem>
  )
}
