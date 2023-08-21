'use server'

import { z } from 'zod'

import { createTrialSchema } from '@/utils/zod'
import { ITrialBase } from '@/types/api/trial'
import { getAuthTokenFromServerComponent } from '@/utils/server'

import { postCreateTrial, postVisitWindows } from '../requests'

export const createTrial = async (data: z.input<typeof createTrialSchema>) => {
  const authToken = getAuthTokenFromServerComponent()
  const { visit_windows: visitWindows, ...trialData } = data

  const formattedVisitWindowsData = visitWindows.map(
    ({
      separate_visit_window,
      window_before_days,
      window_after_days,
      window_buffer,
      visit_type,
      ...rest
    }) => ({
      window_before_days: separate_visit_window
        ? window_before_days || 0
        : window_buffer || 0,
      window_after_days: separate_visit_window
        ? window_after_days || 0
        : window_buffer || 0,
      visit_type: visit_type?.value,
      ...rest,
    })
  )

  const responseCreateTrial = await postCreateTrial<ITrialBase[]>(trialData, {
    authToken,
  })

  const createdTrialId = responseCreateTrial?.data?.[0]?.trial_id

  if (createdTrialId) {
    const responseCreatedVisitWindows = await postVisitWindows<ITrialBase>(
      {
        trialId: createdTrialId,
        data: formattedVisitWindowsData,
      },
      { authToken }
    )

    return responseCreatedVisitWindows
  }

  return { ...responseCreateTrial, status: 400 }
}
