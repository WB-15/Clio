import { z } from 'zod'
import { TYPE_OF_VISITS } from '@/constants'

export const createTrialSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contact_name: z.string().min(1, { message: 'Contact name is required' }),
  contact_number: z
    .string()
    .min(1, { message: 'Phone is required' })
    .regex(/^\+?\d{8,}$/, {
      message: 'Please provide a valid phone number.',
    }),
  visit_windows: z
    .array(
      z.object({
        name: z
          .string({ required_error: 'Name is required' })
          .min(1, { message: 'Name is required' }),
        visit_day: z.coerce
          .number({
            invalid_type_error: 'Day of visit must contain only numbers',
          })
          .gte(1, { message: 'Visit day is required' })
          .lte(99999, { message: 'The entered value should not exceed 99999' }),
        separate_visit_window: z.coerce.boolean(),
        window_buffer: z.coerce.number(),
        window_before_days: z.coerce.number(),
        window_after_days: z.coerce.number(),
        duration_minutes: z.coerce
          .number({
            invalid_type_error: 'Duration must contain only numbers',
          })
          .gte(1, { message: 'Duration is required' })
          .lte(720, {
            message: 'The entered value should not exceed 720 minutes',
          }),
        visit_type: z.any().superRefine((val, ctx) => {
          if (!val?.value)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Visit type is required',
            })

          if (
            !TYPE_OF_VISITS.find(
              ({ value: eventKey }) => eventKey === val?.value
            )
          )
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'The visit type must be "remote" or "on site"',
            })
        }),
        fasting: z.coerce.boolean(),
      })
    )
    .min(1, { message: 'Requires at least 1 visit window' }),
})
