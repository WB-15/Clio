import { ComponentProps, ReactNode } from 'react'
import {
  DropdownMenuContent as RadixDropdownMenuContent,
  DropdownMenuTrigger as RadixDropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

// Tabs
export type IUITab = {
  value: string
  text: string
}

// Tab-like Nav Link
export type ITabNavLink = {
  name: string
  url: string
  prefetch?: boolean
  forceRouterRefresh?: boolean
}

// Dropdown
export interface IUIDropdownItemBasic {
  eventKey: string
  text: string
  variant?: 'default' | 'danger'
  as?: any
  href?: string
}

interface IUIDropdownItemIcon extends IUIDropdownItemBasic {
  iconName: string
}

export type IUIDropdownItem = IUIDropdownItemIcon

export type CustomDropdownProps = {
  triggerContent: ReactNode
  onSelect?: (eventKey: string) => void
  dropdownItems: IUIDropdownItem[]
  dropdownMenuProps?: ComponentProps<typeof RadixDropdownMenuContent>
  dropdownTriggerProps?: ComponentProps<typeof RadixDropdownMenuTrigger>
}

export type IUIBreadcrumb = {
  text: string
  url?: string
  active?: boolean
}
