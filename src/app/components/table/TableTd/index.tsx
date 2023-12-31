import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

interface TableTdProps extends ComponentProps<'th'> {}

export const TableTd: FC<TableTdProps> = (props) => {
  const { children, className, align = 'left', ...rest } = props

  return (
    <td
      {...rest}
      align={align}
      className={clsx(
        'h-12 border-b border-neutral-100 px-2 text-sm font-medium leading-3.5 first:pl-4 last:pr-4',
        className
      )}
    >
      {children}
    </td>
  )
}
