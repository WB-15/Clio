import { ReactNode } from 'react'

export type ToastOptions = {
  toastId: string
  variant?: 'success' | 'danger'
  title: string | ReactNode
  description: string | ReactNode
}
