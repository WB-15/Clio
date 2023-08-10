import { FC, ReactNode } from 'react'

import { Header } from '@/app/layoutComponents'
import { UserContextProvider } from '@/app/context'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props

  return (
    <UserContextProvider>
      <main className="min-w-[1024px]">
        <Header />
        {children}
      </main>
    </UserContextProvider>
  )
}

export default Layout
