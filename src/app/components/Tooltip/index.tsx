import { ComponentProps, FC } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

import { Icon } from '../Icon'

interface TooltipProps extends ComponentProps<typeof RadixTooltip.Provider> {
  tooltipContent: string
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const { tooltipContent, children, ...rest } = props

  return (
    <div className="flex items-center gap-x-2">
      {children}
      <RadixTooltip.Provider delayDuration={300} {...rest}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger onClick={(e) => e.preventDefault()}>
            <Icon
              name="icon-question"
              size={24}
              className="text-neutral-400 duration-300 ease-in-out hocus:text-primary-500"
            />
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              side="right"
              align="start"
              className="tooltip-content z-tooltip max-w-[224px] rounded-lg bg-neutral-900 p-2.5 text-sm text-white"
              sideOffset={5}
            >
              {tooltipContent}
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    </div>
  )
}
