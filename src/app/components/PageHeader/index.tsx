import { FC, ReactNode } from 'react'
import clsx from 'clsx'

import { IUIBreadcrumb } from '@/types'

import { Breadcrumb } from '../Breadcrumb'

interface PageHeaderProps {
  children: ReactNode
  buttonSlotLeft?: ReactNode
  breadcrumb?: IUIBreadcrumb[]
  buttonSlotRight?: ReactNode
  headerWrapperClassName?: string
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    children,
    breadcrumb,
    buttonSlotLeft,
    buttonSlotRight,
    headerWrapperClassName,
  } = props
  return (
    <div className="grid gap-y-4">
      {breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
      <div
        className={clsx('flex items-center gap-x-3', headerWrapperClassName)}
      >
        {buttonSlotLeft}
        <h1 className="line-clamp-1 text-[26px] font-bold leading-10">
          {children}
        </h1>
        {buttonSlotRight}
      </div>
    </div>
  )
}
