import { ReactNode } from 'react'
import { DM_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { DEFAULT_METADATA } from '@/constants'

export const runtime = 'edge'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = DEFAULT_METADATA

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}

export default RootLayout
