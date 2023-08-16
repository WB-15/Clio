import { FC, ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
}

export const Badge: FC<BadgeProps> = (props) => {
  const { children } = props

  return (
    <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-2 py-[3px] text-sm font-normal">
      {children}
    </div>
  )
}
