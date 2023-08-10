import { FC } from 'react'

import { Button, Icon } from '@/app/components'

interface NotificationButtonProps {}

const NotificationButton: FC<NotificationButtonProps> = () => {
  return (
    <Button
      variant="outline"
      iconSlotLeft={<Icon name="icon-notification" size={24} />}
      iconSlotRight={
        <span className="inline-flex h-4 min-w-[16px] max-w-[24px] place-content-center rounded-full bg-red-900 text-xs text-white">
          <span className="truncate px-1">2</span>
        </span>
      }
    >
      Notification
    </Button>
  )
}

export default NotificationButton
