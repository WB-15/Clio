'use client'

import { FC, startTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'

import { ITabNavLink } from '@/types/ui'

interface TabNavLinksListProps {
  navLinks: ITabNavLink[]
  className?: string
}

export const TabNavLinksList: FC<TabNavLinksListProps> = (props) => {
  const { navLinks, className } = props

  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className={clsx('border-b border-neutral-200', className)}>
      <ul className="flex gap-x-6">
        {navLinks.map(({ name, url, prefetch, forceRouterRefresh }) => {
          const isCurrentPage = pathname === url

          return (
            <li key={url}>
              <Link
                href={url}
                className={clsx(
                  'grid pb-3 text-sm font-medium text-neutral-400 shadow-primary-500 duration-300 ease-in-out',
                  'data-active:text-primary-500 data-active:shadow-[inset_0_-1px_0_0] data-inactive:hocus:text-primary-500'
                )}
                data-state={isCurrentPage ? 'active' : 'inactive'}
                aria-current={isCurrentPage ? 'page' : false}
                prefetch={prefetch}
                onClick={
                  // Workaround from https://github.com/vercel/next.js/issues/42991#issuecomment-1551488466
                  forceRouterRefresh
                    ? (e) => {
                        e.preventDefault()
                        startTransition(() => {
                          router.push(url)
                          router.refresh()
                        })
                      }
                    : undefined
                }
              >
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
