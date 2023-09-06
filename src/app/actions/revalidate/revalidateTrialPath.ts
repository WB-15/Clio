'use server'

import { revalidatePath } from 'next/cache'
import { RouteURL } from '@/constants'

export const revalidateTrialPath = async () => {
  revalidatePath(RouteURL.Site.TRIAL)
}
