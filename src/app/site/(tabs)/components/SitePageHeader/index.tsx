import React, { FC } from 'react'

import CreateTrialDialog from '../CreateTrialDialog'

interface PageHeaderProps {
  heading: string
}

const SitePageHeader: FC<PageHeaderProps> = (props) => {
  const { heading } = props

  return (
    <div className="grid grid-flow-col items-center justify-between gap-x-3">
      <h1 className="line-clamp-1 text-[26px] font-bold leading-10">
        {heading}
      </h1>

      <CreateTrialDialog />
    </div>
  )
}

export default SitePageHeader
