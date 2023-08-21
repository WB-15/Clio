'use server'

import { revalidatePath } from 'next/cache'
import { RouteURL } from '@/constants'

export const revalidateTrialListPath = async () => {
  revalidatePath(RouteURL.Site.TRIALS)
}
