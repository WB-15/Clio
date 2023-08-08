import React from 'react'
import Image from 'next/image'

import LoginForm from './components/LoginContainer'

const LoginPage = () => {
  return (
    <div className="container grid h-screen place-content-center place-items-center gap-y-6">
      <Image width={81} height={26} src="/img/logo.svg" alt="clio logo" />

      <LoginForm />
    </div>
  )
}

export default LoginPage
