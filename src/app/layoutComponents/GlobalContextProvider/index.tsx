import { PropsWithChildren } from 'react'

import { CustomQueryClientProvider, queryClient } from '@/query'

interface GlobalContextProviderProps extends PropsWithChildren {}

export const GlobalContextProvider = async ({
  children,
}: GlobalContextProviderProps) => {
  return (
    <CustomQueryClientProvider client={queryClient}>
      {children}
    </CustomQueryClientProvider>
  )
}

export default GlobalContextProvider
