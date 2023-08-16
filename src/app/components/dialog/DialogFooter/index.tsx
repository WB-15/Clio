import { FC, ReactNode } from 'react'

interface DialogFooterProps {
  buttonSlotSecondary?: ReactNode
  buttonSlotPrimary?: ReactNode
}

export const DialogFooter: FC<DialogFooterProps> = (props) => {
  const { buttonSlotPrimary, buttonSlotSecondary } = props
  return (
    <div className="border-t border-neutral-200">
      <div className="grid grid-flow-col justify-end gap-3 p-5">
        {buttonSlotSecondary && buttonSlotSecondary}
        {buttonSlotPrimary && buttonSlotPrimary}
      </div>
    </div>
  )
}
