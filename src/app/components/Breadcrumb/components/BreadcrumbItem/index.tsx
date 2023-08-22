import { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { IUIBreadcrumb } from '@/types'

interface BreadcrumbItemProps extends IUIBreadcrumb {}

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
  const { text, url, active } = props

  return (
    <li
      className={clsx(
        'breadcrumb-item flex items-center text-sm duration-300 ease-in-out',
        active ? 'text-neutral-600' : 'text-neutral-400 hocus:text-neutral-600'
      )}
    >
      {url ? <Link href={url}>{text}</Link> : text}
    </li>
  )
}

export default BreadcrumbItem
