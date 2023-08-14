import React, { FC } from 'react'
import Image from 'next/image'

import { Button, Icon } from '@/app/components'

import User from './components/User'
import LogOutButton from './components/LogOutButton'
import NotificationButton from './components/Notification/components/NotificationButton'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="grid h-19 min-w-[1024px] grid-flow-col items-center justify-between border-b border-neutral-100 bg-white px-9">
      <Image width={81} height={26} src="/img/logo.svg" alt="clio logo" />

      <div className="grid grid-flow-col gap-x-9">
        <div className="grid grid-flow-col gap-x-3.5">
          <Button
            variant="outline"
            iconSlotLeft={
              <Icon
                name="icon-settings"
                size={24}
                className="duration-300 ease-in-out group-hocus:rotate-180"
              />
            }
          >
            Site configuration
          </Button>

          <NotificationButton />
        </div>

        <div className="grid grid-flow-col items-center gap-x-5">
          <User />
          <LogOutButton />
        </div>
      </div>
    </header>
  )
}
