import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { RouteURL } from '@/constants'

import User from './components/User'
import LogOutButton from './components/LogOutButton'
import NotificationButton from './components/Notification/components/NotificationButton'
import SiteConfigurationDialog from './components/SiteConfigurationDialog'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="border-b border-neutral-100 bg-white">
      <div className="container grid h-19 grid-flow-col items-center justify-between px-9">
        <Link href={RouteURL.Site.UPCOMING_VISITS}>
          <Image width={81} height={26} src="/img/logo.svg" alt="clio logo" />
        </Link>

        <div className="grid grid-flow-col gap-x-9">
          <div className="grid grid-flow-col gap-x-3.5">
            <SiteConfigurationDialog />

            <NotificationButton />
          </div>

          <div className="grid grid-flow-col items-center gap-x-5">
            <User />
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
