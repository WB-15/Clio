import { FC, ReactNode } from 'react'
import { DialogTitle, DialogClose } from '@radix-ui/react-dialog'
import { Icon } from '@/app/components'

interface DialogHeaderProps {
  children: ReactNode
}

export const DialogHeader: FC<DialogHeaderProps> = (props) => {
  const { children } = props

  return (
    <div className="border-b border-neutral-200">
      <DialogTitle className="grid grid-flow-col items-center justify-between gap-x-3 p-5 text-xl font-bold text-black">
        {children}
        <DialogClose className="rounded-full bg-neutral-100 p-1.5 text-neutral-900 duration-300 ease-in-out hocus:bg-neutral-200">
          <Icon name="icon-close" size={20} />
        </DialogClose>
      </DialogTitle>
    </div>
  )
}
