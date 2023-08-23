import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

interface TableThProps extends ComponentProps<'th'> {
  classNameInner?: string
}

export const TableTh: FC<TableThProps> = (props) => {
  const { children, classNameInner, className, align = 'left', ...rest } = props

  return (
    <th
      {...rest}
      align={align}
      className={clsx('group h-full px-0 py-2 first:pl-2 last:pr-2', className)}
    >
      <div
        className={clsx(
          'h-full border-b border-t border-neutral-100 bg-neutral-50 p-2 text-sm font-normal leading-4 text-neutral-400 group-first:rounded-l group-first:border-l group-last:rounded-r group-last:border-r',
          classNameInner
        )}
      >
        {children}
      </div>
    </th>
  )
}
