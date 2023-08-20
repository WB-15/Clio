'use server'

import { z } from 'zod'
import { createTrialSchema } from '@/utils/zod'
import { ITrialBase } from '@/types/api/trial'
import { getAuthTokenFromServerComponent } from '@/utils/server'

import { postCreateTrial, postVisitWindows } from './requests'

export const actionCreateTrial = async (
  data: z.input<typeof createTrialSchema>
) => {
  const authToken = getAuthTokenFromServerComponent()
  const { visit_windows: visitWindows, ...rest } = data

  const formattedCreateTrialData = rest
  const formattedVisitWindowsData = visitWindows.map(
    ({
      name,
      visit_day,
      separate_visit_window,
      window_before_days,
      window_after_days,
      window_buffer,
      duration_minutes,
      visit_type,
      fasting,
    }) => ({
      name,
      visit_day,
      window_before_days: separate_visit_window
        ? window_before_days || 0
        : window_buffer || 0,
      window_after_days: separate_visit_window
        ? window_after_days || 0
        : window_buffer || 0,
      duration_minutes,
      visit_type: visit_type?.value,
      fasting,
    })
  )

  const createdTrial = await postCreateTrial<ITrialBase[]>(
    formattedCreateTrialData,
    {
      authToken,
    }
  )

  const createdTrialId = createdTrial?.data?.[0]?.trial_id

  if (createdTrialId) {
    const createdVisitWindows = await postVisitWindows<ITrialBase>(
      {
        trialId: createdTrialId,
        data: formattedVisitWindowsData,
      },
      { authToken }
    )

    return createdVisitWindows
  }

  return createdTrial
}
