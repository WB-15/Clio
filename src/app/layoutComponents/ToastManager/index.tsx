'use client'

import { useEffect, useState } from 'react'

import { events } from '@/utils'
import { EventKey } from '@/constants'
import { ToastOptions } from '@/types'

import Toast from './components/Toast'

export const ToastManager = () => {
  const [toastsStack, setToastsStack] = useState<ToastOptions[]>([])

  const appendToast = (toast: ToastOptions) =>
    setToastsStack((prevState) => [...prevState, toast])

  const handleAddToastToStack = (toastOptions: ToastOptions) => {
    if (!toastOptions.title && !toastOptions.description) return
    appendToast(toastOptions)
  }

  const removeToastFromStack = (toastIdToRemove: ToastOptions['toastId']) =>
    setToastsStack((prevState) =>
      prevState.filter(({ toastId }) => toastId !== toastIdToRemove)
    )

  useEffect(() => {
    events.on(EventKey.Toast.ADD_TOAST_TO_STACK, handleAddToastToStack)

    return () => {
      events.off(EventKey.Toast.ADD_TOAST_TO_STACK, handleAddToastToStack)
    }
  }, [])

  return (
    <div className="fixed right-0 top-0 z-toast flex flex-col items-end p-7">
      {toastsStack.map((toast) => (
        <Toast
          key={toast.toastId}
          {...toast}
          onClose={(id) => removeToastFromStack(id)}
        />
      ))}
    </div>
  )
}
