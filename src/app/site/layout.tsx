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
      <Header />
      <main className="container min-w-[1024px] pb-28 pt-9">{children}</main>
    </UserContextProvider>
  )
}

export default Layout
