import { PropsWithChildren } from 'react'

import { CustomQueryClientProvider, getCurrentUser, queryClient } from '@/query'
import { UserContextProvider } from '@/app/context'
import { getAuthTokenFromServerComponent } from '@/utils/server'
import { IUser } from '@/types/api'

interface GlobalContextProviderProps extends PropsWithChildren {}

export const GlobalContextProvider = async ({
  children,
}: GlobalContextProviderProps) => {
  const { data } = await getCurrentUser<IUser>({
    authToken: getAuthTokenFromServerComponent(),
  })

  return (
    <CustomQueryClientProvider client={queryClient}>
      <UserContextProvider data={data}>{children}</UserContextProvider>
    </CustomQueryClientProvider>
  )
}

export default GlobalContextProvider
