import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

interface TableLinkTdProps extends ComponentProps<'th'> {
  url: string
}

export const TableLinkTd: FC<TableLinkTdProps> = (props) => {
  const { children, className, align = 'left', url, ...rest } = props

  return (
    <td
      {...rest}
      align={align}
      className={clsx(
        'h-12 border-b border-neutral-100 px-2 text-sm font-medium leading-3.5 first:pl-4 last:pr-4',
        className
      )}
    >
      <a href={url} className="flex h-full items-center">
        {children}
      </a>
    </td>
  )
}
