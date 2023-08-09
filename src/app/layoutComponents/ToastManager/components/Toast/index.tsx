import { FC, ReactNode } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import clsx from 'clsx'

import { Icon } from '@/app/components'

import { TOAST_AUTO_HIDE_DELAY } from './constants'

const TOAST_ICONS: { [key: string]: string } = {
  success: 'tick',
  danger: 'close',
}

interface ToastProps {
  toastId: string
  variant?: string
  title: ReactNode
  description: ReactNode
  onClose: (id: string) => void
}

const Toast: FC<ToastProps> = (props) => {
  const { toastId, variant = 'success', title, description, onClose } = props

  const handleSetHeight = (node: HTMLLIElement) => {
    if (node && !node.style.height)
      // eslint-disable-next-line no-param-reassign
      node.style.height = `${node.getBoundingClientRect().height + 16}px`
  }

  const handleToastClose = (isOpen: boolean) => {
    if (!isOpen)
      setTimeout(() => {
        onClose(toastId)
      }, 250)
  }

  return (
    <RadixToast.Provider
      swipeDirection="right"
      duration={TOAST_AUTO_HIDE_DELAY}
    >
      <RadixToast.Root
        ref={handleSetHeight}
        className="toast-root relative mt-2 grid grid-cols-[auto_auto] grid-rows-[auto_auto] content-center items-center gap-x-3 rounded-xl border border-neutral-100 bg-white px-2.5 transition-all ease-in-out"
        onOpenChange={handleToastClose}
      >
        <div
          className={clsx(
            'row-span-full grid h-8 w-8 place-items-center rounded-full text-white',
            {
              'bg-green-500': variant === 'success',
              'bg-red-300': variant === 'danger',
            }
          )}
        >
          <Icon name={`icon-${TOAST_ICONS[variant]}`} size={16} />
        </div>
        <RadixToast.Title className="text-sm">{title}</RadixToast.Title>
        <RadixToast.Description className="text-xs text-neutral-400">
          {description}
        </RadixToast.Description>
        <RadixToast.Close className="absolute -right-[8px] -top-[6px] grid h-6 w-6 place-items-center rounded-full border border-neutral-100 bg-white">
          <Icon name="icon-close" size={16} />
        </RadixToast.Close>
      </RadixToast.Root>

      <RadixToast.Viewport />
    </RadixToast.Provider>
  )
}

export default Toast
