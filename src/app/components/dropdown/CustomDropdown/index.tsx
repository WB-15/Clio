'use client'

import { FC } from 'react'

import { DropdownMenu as RadixDropdownMenu } from '@radix-ui/react-dropdown-menu'

import { CustomDropdownProps } from '@/types'

import { DropdownMenu } from '../DropdownMenu'
import { DropdownToggle } from '../DropdownToggle'
import { DropdownMenuItems } from '../DropdownMenuItems'

export const CustomDropdown: FC<CustomDropdownProps> = (props) => {
  const {
    triggerContent,
    onSelect,
    dropdownItems,
    dropdownMenuProps,
    dropdownTriggerProps,
  } = props

  return (
    <RadixDropdownMenu modal={false}>
      <DropdownToggle
        {...dropdownTriggerProps}
        triggerContent={triggerContent}
      />
      {!!dropdownItems.length && (
        <DropdownMenu
          loop
          collisionPadding={{ top: 4, right: 4, bottom: 4, left: 4 }}
          {...dropdownMenuProps}
        >
          <DropdownMenuItems
            dropdownItems={dropdownItems}
            onSelect={onSelect}
          />
        </DropdownMenu>
      )}
    </RadixDropdownMenu>
  )
}
