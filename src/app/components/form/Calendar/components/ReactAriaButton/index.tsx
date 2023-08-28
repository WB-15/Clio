import { FC, ReactNode, useRef } from 'react'
import { AriaButtonOptions, useButton } from 'react-aria'
import clsx from 'clsx'

interface ReactAriaButtonProps extends AriaButtonOptions<'button'> {
  children: ReactNode
  className?: string
}

const ReactAriaButton: FC<ReactAriaButtonProps> = (props) => {
  const { children, className } = props
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...buttonProps}
      ref={ref}
      className={clsx(
        'rounded-xl border border-neutral-200 p-2 duration-300 ease-in-out hocus:bg-neutral-100',
        className
      )}
    >
      {children}
    </button>
  )
}

export default ReactAriaButton
