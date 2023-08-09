import { ComponentProps, FC, ReactNode } from 'react'
import clsx from 'clsx'

interface OptionalErrorMessageProps extends ComponentProps<'div'> {
  errorText: ReactNode
}

export const OptionalErrorMessage: FC<OptionalErrorMessageProps> = (props) => {
  const { errorText, className, ...rest } = props

  if (!errorText) return null

  return (
    <div {...rest} className={clsx('text-sm text-red-600', className)}>
      {errorText}
    </div>
  )
}
