import React, { FC } from 'react'
import { Button, Icon } from '@/app/components'

interface TabHeaderProps {}

export const TabHeader: FC<TabHeaderProps> = () => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-[20px] font-bold">Visits</h4>
      <Button
        variant="primary"
        iconSlotLeft={<Icon name="icon-download" size={20} />}
      >
        Download event
      </Button>
    </div>
  )
}
