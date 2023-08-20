import { FC } from 'react'

import { IUIDropdownItem } from '@/types'

import DropdownMenuItem from './components/DropdownMenuItem'

interface DropdownMenuItemsProps {
  dropdownItems: IUIDropdownItem[]
  onSelect?: (eventKey: string) => void
}

export const DropdownMenuItems: FC<DropdownMenuItemsProps> = (props) => {
  const { dropdownItems, onSelect } = props

  return (
    <div className="grid gap-y-1 overflow-auto">
      {dropdownItems.map(
        ({ text, iconName, eventKey, as = 'button', href, variant }) => (
          <DropdownMenuItem
            onSelect={onSelect}
            as={as}
            key={eventKey}
            eventKey={eventKey}
            text={text}
            iconName={iconName}
            href={href}
            variant={variant}
          />
        )
      )}
    </div>
  )
}
