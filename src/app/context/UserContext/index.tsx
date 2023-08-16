'use client'

import { FC, createContext, PropsWithChildren, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ApiResponse, IUser } from '@/types/api'
import { getCurrentUser, QueryKey } from '@/query'
import { getAuthTokenFromCookies } from '@/utils/cookie'

interface IUserContext extends IUser {}

const defaultValue: IUser = {
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: null,
  active: false,
  metadata: {},
  created: null,
  modified: null,
  is_patient: false,
  is_cra: false,
  is_site_user: false,
}

const UserContext = createContext<IUserContext>(defaultValue)

interface UserContextProviderProps extends PropsWithChildren {}

export const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const { children } = props

  const { data } = useQuery<ApiResponse<IUser>>({
    queryKey: [QueryKey.ME],
    queryFn: () => getCurrentUser({ authToken: getAuthTokenFromCookies() }),
  })

  return (
    <UserContext.Provider value={data?.data || defaultValue}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be used within ChatContextProvider')
  }

  return context
}
