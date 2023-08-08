import { ComponentProps, FC } from 'react'
import { Label as RadixLabel } from '@radix-ui/react-label'
import clsx from 'clsx'

interface InputLabelProps extends ComponentProps<typeof RadixLabel> {}

export const InputLabel: FC<InputLabelProps> = (props) => {
  const { className, children, ...rest } = props

  return (
    <RadixLabel {...rest} className={clsx('pb-1.5 text-sm', className)}>
      {children}
    </RadixLabel>
  )
}
