'use client'

import { createContext, FC, PropsWithChildren, useContext } from 'react'

import { IUser } from '@/types/api'

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

interface UserContextProviderProps extends PropsWithChildren {
  data?: IUser
}

export const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const { data, children } = props

  return (
    <UserContext.Provider value={data || defaultValue}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
