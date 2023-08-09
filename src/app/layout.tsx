import { ReactNode } from 'react'
import { DM_Sans } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/globals.css'
import { DEFAULT_METADATA } from '@/constants'
import { GlobalContextProvider, ToastManager } from '@/app/layoutComponents'

export const runtime = 'edge'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = DEFAULT_METADATA

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body className={clsx('bg-neutral-50', dmSans.className)}>
          {children}
          <ToastManager />
        </body>
      </GlobalContextProvider>
    </html>
  )
}

export default RootLayout
