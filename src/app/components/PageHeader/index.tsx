import React, { FC } from 'react'

import { Icon } from '../Icon'
import { Button } from '../Button'

interface PageHeaderProps {
  heading: string
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const { heading } = props

  return (
    <div className="grid grid-flow-col items-center justify-between">
      <h1 className="text-[26px] font-bold leading-10">{heading}</h1>
      <Button
        variant="primary"
        iconSlotLeft={<Icon size={20} name="icon-plus" />}
      >
        Create Trial
      </Button>
    </div>
  )
}
