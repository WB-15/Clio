import { PropsWithChildren } from 'react'

import { CustomQueryClientProvider, queryClient } from '@/query'
import { UserContextProvider } from '@/app/context'

interface GlobalContextProviderProps extends PropsWithChildren {}

export const GlobalContextProvider = async ({
  children,
}: GlobalContextProviderProps) => {
  return (
    <CustomQueryClientProvider client={queryClient}>
      <UserContextProvider>{children}</UserContextProvider>
    </CustomQueryClientProvider>
  )
}

export default GlobalContextProvider
