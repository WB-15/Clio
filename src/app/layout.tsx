import './globals.css'
import { DEFAULT_METADATA } from '@/constants'

export const runtime = 'edge'

export const metadata = DEFAULT_METADATA

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
