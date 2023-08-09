'use client'

import React from 'react'

import { Button } from '@/app/components'
import { removeAuthTokensCookies } from '@/utils/cookie'

const LoginPage = () => {
  return (
    <div className="container grid h-screen place-content-center">
      <h1>SITE PAGE</h1>
      <Button variant="primary" onClick={() => removeAuthTokensCookies()}>
        Log out
      </Button>
    </div>
  )
}

export default LoginPage
