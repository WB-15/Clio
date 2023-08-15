import { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import {
  TabsList as RadixTabsList,
  TabsTrigger as RadixTabsTrigger,
} from '@radix-ui/react-tabs'

import { IUITab } from '@/types/ui'

interface TabsListProps extends ComponentProps<typeof RadixTabsList> {
  tabs: IUITab[]
}

export const TabsList: FC<TabsListProps> = (props) => {
  const { tabs, className, ...rest } = props

  return (
    <RadixTabsList
      {...rest}
      className={clsx(
        'grid auto-cols-auto grid-flow-col justify-start gap-x-6 border-b border-neutral-200 font-medium leading-tight',
        className
      )}
    >
      {tabs.map(({ value, text }) => (
        <RadixTabsTrigger
          key={value}
          value={value}
          className="pb-3 text-sm text-neutral-400 shadow-primary-500 duration-300 ease-in-out data-active:text-primary-500 data-active:shadow-[inset_0_-1px_0_0]"
        >
          {text}
        </RadixTabsTrigger>
      ))}
    </RadixTabsList>
  )
}
