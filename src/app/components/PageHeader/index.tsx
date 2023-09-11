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
  subTitle?: ReactNode
  bottomInfo?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    children,
    breadcrumb,
    buttonSlotLeft,
    buttonSlotRight,
    headerWrapperClassName,
    subTitle,
    bottomInfo,
  } = props
  return (
    <div className="grid gap-y-4">
      {breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
      {subTitle}
      <div
        className={clsx('flex items-center gap-x-3', headerWrapperClassName)}
      >
        {buttonSlotLeft}
        <h1 className="line-clamp-1 w-full text-[26px] font-bold leading-10">
          {children}
        </h1>
        {buttonSlotRight}
      </div>
      {bottomInfo}
    </div>
  )
}
