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
