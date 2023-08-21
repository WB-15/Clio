import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/query/queryKeys'

export const useInvalidateClientQueries = () => {
  const queryClient = useQueryClient()

  const invalidateQueriesOnLogIn = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.ME],
    })
  }, [queryClient])

  const invalidateQueriesOnLogOut = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.ME],
    })
  }, [queryClient])

  return { invalidateQueriesOnLogIn, invalidateQueriesOnLogOut }
}
