'use client'

import { ComponentProps, FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const ReactQueryDevtools = dynamic(
//   () =>
//     import('@tanstack/react-query-devtools').then(
//       (lib) => lib.ReactQueryDevtools
//     ),
//   { ssr: false }
// )

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export const CustomQueryClientProvider: FC<
  ComponentProps<typeof QueryClientProvider>
> = ({ children, ...rest }) => (
  <QueryClientProvider {...rest} client={queryClient}>
    {children}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
)
