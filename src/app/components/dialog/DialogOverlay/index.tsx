import { ComponentProps, forwardRef } from 'react'
import { DialogOverlay as RadixDialogOverlay } from '@radix-ui/react-dialog'
import clsx from 'clsx'

interface DialogOverlayProps extends ComponentProps<typeof RadixDialogOverlay> {
  contentPosition?: 'center' | 'right'
}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, ref) => {
    const { contentPosition = 'center', className, ...rest } = props

    return (
      <RadixDialogOverlay
        {...rest}
        className={clsx(
          'dialog-overlay hide-scrollbar fixed inset-0 z-dialog-backdrop grid w-full overflow-y-auto bg-black/25',
          { 'place-items-center': contentPosition === 'center' },
          { 'items-center justify-items-end': contentPosition === 'right' },
          className
        )}
        ref={ref}
      />
    )
  }
)

DialogOverlay.displayName = 'DialogOverlay'
