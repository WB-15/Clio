import React from 'react'
import Image from 'next/image'

import { mergeMetadataWithDefault } from '@/utils/seo'
import LoginContainer from './components/LoginContainer'

export const metadata = mergeMetadataWithDefault({ title: 'Login' })

const LoginPage = () => {
  return (
    <main className="container grid h-screen min-w-[360px] place-content-center place-items-center gap-y-6">
      <Image width={81} height={26} src="/img/logo.svg" alt="clio logo" />

      <LoginContainer />
    </main>
  )
}

export default LoginPage
