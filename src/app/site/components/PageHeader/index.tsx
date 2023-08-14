import React, { FC } from 'react'

import { Button, Icon } from '@/app/components'

interface PageHeaderProps {}

const PageHeader: FC<PageHeaderProps> = () => {
  return (
    <div className="grid grid-flow-col items-center justify-between">
      <h1 className="text-[26px] font-bold leading-10">Dashboard</h1>
      <Button
        variant="primary"
        iconSlotLeft={<Icon size={20} name="icon-plus" />}
      >
        Create Trial
      </Button>
    </div>
  )
}

export default PageHeader
