import React from 'react'
import { cookies } from 'next/headers'

import { CookieKey } from '@/constants'
import { getTrialList } from '@/query'
import { ITrial } from '@/types/api'
import { jsonParseSafe } from '@/utils'
import { mergeMetadataWithDefault } from '@/utils/seo'

import SiteTabsContent from './components/SiteTabsContent'
import PageHeader from './components/PageHeader'

export const metadata = mergeMetadataWithDefault({ title: 'Site' })

const SitePage = async () => {
  const authToken = jsonParseSafe(
    cookies().get(CookieKey.AUTH_TOKEN)?.value,
    null
  )

  const trialList = await getTrialList<ITrial[]>({
    authToken,
    options: { cache: 'no-cache' },
  })

  return (
    <>
      <PageHeader />
      <SiteTabsContent trialList={trialList} className="mt-6" />
    </>
  )
}

export default SitePage
