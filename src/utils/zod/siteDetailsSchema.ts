import { z } from 'zod'
import { TIMEZONES } from '@/constants'

export const hoursSchema = z
  .object({
    isWorking: z.coerce.boolean(),
    start: z.any(),
    end: z.any(),
  })
  .refine((data) => (data?.isWorking ? data.start && data.end : true), {
    message: 'Start and End time is required',
  })

const availabilitySchema = z.object({
  timezone: z.any().superRefine((data, ctx) => {
    if (!data?.value)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Timezone is required',
      })

    if (!TIMEZONES.includes(data?.value))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select from available timezones',
      })
  }),
  sunday: hoursSchema,
  monday: hoursSchema,
  tuesday: hoursSchema,
  wednesday: hoursSchema,
  thursday: hoursSchema,
  friday: hoursSchema,
  saturday: hoursSchema,
})

export const siteDetailsSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contact_number: z
    .string()
    .regex(/^\+?\d{8,12}$/, {
      message: 'Please provide a valid phone number.',
    })
    .optional()
    .or(z.literal('')),
  contact_email: z.string().optional(),
  contact_user_id: z.string().optional(),
  default_patient_reminder_hours: z
    .any()
    .refine((data) => parseInt(data?.value, 10), {
      message: 'Notification value must be a positive integer',
    }),
  availability: availabilitySchema,
})
