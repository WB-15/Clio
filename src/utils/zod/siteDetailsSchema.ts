import { any, z } from 'zod'

export const siteDetailsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  contact_number: z
    .string()
    .min(1, { message: 'Phone is required' })
    .regex(/^\+?\d{8,}$/, {
      message: 'Please provide a valid phone number.',
    }),
  contact_email: z.string().email('Invalid email address'),
  default_patient_reminder_hours: z.any().superRefine((val, ctx) => {
    if (!val?.value)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Notification is required',
      })

    if (!parseFloat(val?.value))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Notification value must be a number',
      })
  }),
  availability: z.object({
    timezone: z
      .any()
      .refine((val) => val?.value, { message: 'Timezone is required' }),
    sunday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    monday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    tuesday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    wednesday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    thursday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    friday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
    saturday: z
      .object({
        isWorking: z.coerce.boolean(),
        start: any(),
        end: any(),
      })
      .refine((data) => (data?.isWorking ? data.start && data.end : true), {
        message: 'Start and End time is required',
      }),
  }),
})
