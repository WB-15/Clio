'use client'

import { FC, createContext, PropsWithChildren, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { IUser } from '@/types/api'
import { QueryKey } from '@/query'
import { useRequestWithAuthToken } from '@/hooks'

interface IUserContext extends IUser {}

const defaultValue = {
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: null,
  active: false,
  metadata: {},
  created: '',
  modified: '',
}

const UserContext = createContext<IUserContext>(defaultValue)

interface UserContextProviderProps extends PropsWithChildren {}

export const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const { children } = props

  const { getMe } = useRequestWithAuthToken()

  const { data } = useQuery<IUser>({
    queryKey: [QueryKey.ME],
    queryFn: () => getMe(),
  })

  return (
    <UserContext.Provider value={data || defaultValue}>
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
