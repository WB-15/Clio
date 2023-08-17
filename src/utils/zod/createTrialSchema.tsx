import { z } from 'zod'

export const createTrialSchema = z.object({
  name: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  visit_windows: z.array(
    z.object({
      name: z.string(),
      visit_day: z.string(),
      window_before_days: z.string(),
      window_after_days: z.string(),
      duration_minutes: z.string(),
      visit_type: z.any().transform((val) => val?.value),
      fasting: z.any(),
    })
  ),
})
