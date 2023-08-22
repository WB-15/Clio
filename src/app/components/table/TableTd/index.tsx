import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

interface TableTdProps extends ComponentProps<'th'> {}

export const TableTd: FC<TableTdProps> = (props) => {
  const { children, className, align = 'left', ...rest } = props

  return (
    <th
      {...rest}
      align={align}
      className={clsx('px-2 py-4 text-sm font-medium leading-3.5', className)}
    >
      {children}
    </th>
  )
}
