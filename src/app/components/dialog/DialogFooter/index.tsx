import { FC, ReactNode } from 'react'

interface DialogFooterProps {
  buttonSlotSecondary?: ReactNode
  buttonSlotPrimary?: ReactNode
  leftFooterContent?: ReactNode
}

export const DialogFooter: FC<DialogFooterProps> = (props) => {
  const { buttonSlotPrimary, buttonSlotSecondary, leftFooterContent } = props
  return (
    <div className="flex items-center justify-between border-t border-neutral-200">
      <div className="p-5">{leftFooterContent}</div>
      <div className="grid grid-flow-col justify-end gap-3 p-5">
        {buttonSlotSecondary && buttonSlotSecondary}
        {buttonSlotPrimary && buttonSlotPrimary}
      </div>
    </div>
  )
}
