import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

interface TableThProps extends ComponentProps<'th'> {}

export const TableTh: FC<TableThProps> = (props) => {
  const { children, className, align = 'left', ...rest } = props

  return (
    <th
      {...rest}
      align={align}
      className={clsx(
        'border-b border-t border-neutral-100 bg-neutral-50 p-2 text-sm font-normal leading-4 text-neutral-400 first:rounded-l first:border-l last:rounded-r last:border-r',
        className
      )}
    >
      {children}
    </th>
  )
}
