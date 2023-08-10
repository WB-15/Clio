'use client'

import { FC } from 'react'

import { useUserContext } from '@/app/context'

interface UserProps {}

const User: FC<UserProps> = () => {
  const { email } = useUserContext()

  return (
    <div>
      <div className="text-xs text-neutral-400">Logged in as</div>
      <div className="text-sm leading-4.5">{email}</div>
    </div>
  )
}

export default User
