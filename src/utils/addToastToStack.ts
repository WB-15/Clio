import { v4 as uuid } from 'uuid'

import { EventKey } from '@/constants'
import { ToastOptions } from '@/types'

import { events } from './events'

interface AddToastOptions extends Omit<ToastOptions, 'toastId'> {
  toastId?: string
}

export const addToastToStack = (toastOptions: AddToastOptions) => {
  events.emit(EventKey.Toast.ADD_TOAST_TO_STACK, {
    toastId: uuid(),
    ...toastOptions,
  })
}
