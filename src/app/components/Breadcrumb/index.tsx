import { FC } from 'react'
import { IUIBreadcrumb } from '@/types'

import BreadcrumbItem from './components/BreadcrumbItem'

interface BreadcrumbProps {
  breadcrumb: IUIBreadcrumb[]
}

export const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  const { breadcrumb } = props
  return (
    <nav>
      <ol className="flex gap-x-2">
        {breadcrumb.map((item) => (
          <BreadcrumbItem key={item.text} {...item} />
        ))}
      </ol>
    </nav>
  )
}
