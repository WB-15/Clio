import { ComponentProps, forwardRef, useRef } from 'react'
import clsx from 'clsx'
import { mergeRefs } from 'react-merge-refs'
import { DialogContent as RadixDialogContent } from '@radix-ui/react-dialog'

type RadixDialogContentType = ComponentProps<typeof RadixDialogContent>

interface DialogContentProps extends RadixDialogContentType {
  classNameInner?: string
  onOpenAutoFocusOverride?: RadixDialogContentType['onOpenAutoFocus']
  position?: 'center' | 'right'
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (props, ref) => {
    const {
      position = 'center',
      children,
      className,
      classNameInner,
      onOpenAutoFocus,
      onOpenAutoFocusOverride,
      ...rest
    } = props

    const dialogContentRef = useRef<HTMLDivElement>(null)

    const handleOpenAutoFocus = () => {
      dialogContentRef.current?.focus()
    }

    const mergedRef = mergeRefs([ref, dialogContentRef])

    return (
      <RadixDialogContent
        {...rest}
        className={clsx(
          'focus-visible:outline-none-force  z-dialog p-2.5',
          { 'dialog-content-right': position === 'right' },
          { 'dialog-content-center': position === 'center' },
          className
        )}
        onOpenAutoFocus={(e) => {
          if (onOpenAutoFocusOverride) {
            onOpenAutoFocusOverride(e)
            return
          }

          e.preventDefault()
          handleOpenAutoFocus()
        }}
        ref={mergedRef}
      >
        <div
          className={clsx(
            'dialog-content-inner relative flex flex-col overflow-hidden rounded-xl bg-white',
            classNameInner
          )}
        >
          {children}
        </div>
      </RadixDialogContent>
    )
  }
)

DialogContent.displayName = 'DialogContent'
