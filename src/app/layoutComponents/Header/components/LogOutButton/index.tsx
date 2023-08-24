'use client'

import React, { FC } from 'react'

import { Button, Icon } from '@/app/components'
import { clearAuthCookiesAndRedirect } from '@/app/actions/cookies'
import { useInvalidateClientQueries } from '@/app/hooks'

interface LogOutButtonProps {}

const LogOutButton: FC<LogOutButtonProps> = () => {
  const { invalidateQueriesOnLogOut } = useInvalidateClientQueries()

  const handleLogOut = () => {
    clearAuthCookiesAndRedirect().then(() => invalidateQueriesOnLogOut())
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
