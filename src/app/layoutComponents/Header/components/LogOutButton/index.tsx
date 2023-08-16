'use client'

import React, { FC } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Icon } from '@/app/components'
import { removeAuthTokensCookies } from '@/utils/cookie'
import { RouteURL } from '@/constants'
import { queryClient } from '@/query'

interface LogOutButtonProps {}

const LogOutButton: FC<LogOutButtonProps> = () => {
  const router = useRouter()

  const handleLogOut = () => {
    removeAuthTokensCookies()
    queryClient.invalidateQueries()
    router.push(RouteURL.LOGIN)
  }

  return (
    <Button
      variant="outline-danger"
      iconSlotLeft={<Icon name="icon-log_out" size={24} />}
      onClick={handleLogOut}
    >
      Log out
    </Button>
  )
}

export default LogOutButton
