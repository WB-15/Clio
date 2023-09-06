import { z } from 'zod'
import { TYPE_OF_VISITS } from '@/constants'

export const trialSchema = z.object({
  name: z.string().optional(),
  contact_name: z.string().optional(),
  contact_number: z
    .string()
    .regex(/^\+?\d{8,12}$/)
    .optional()
    .or(z.literal('')),
  visit_windows: z
    .array(
      z.object({
        visit_window_id: z.string().optional(),
        name: z
          .string({ required_error: 'Name is required' })
          .min(1, { message: 'Name is required' }),
        visit_day: z.coerce
          .number({
            invalid_type_error: 'Day of visit must contain only numbers',
          })
          .gte(1, { message: 'Visit day must be positive' })
          .lte(99999, { message: 'The entered value should not exceed 99999' }),
        separate_visit_window: z.coerce.boolean(),
        window_buffer: z.coerce
          .number({
            invalid_type_error: 'Only numbers allowed',
          })
          .gte(1, { message: 'Window buffer must be positive' })
          .optional()
          .or(z.literal('')),
        window_before_days: z.coerce
          .number({
            invalid_type_error: 'Only numbers allowed',
          })
          .gte(1, { message: 'Must be positive' })
          .optional()
          .or(z.literal('')),
        window_after_days: z.coerce
          .number({
            invalid_type_error: 'Only numbers allowed',
          })
          .gte(1, { message: 'Must be positive' })
          .optional()
          .or(z.literal('')),
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
