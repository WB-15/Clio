import { z } from 'zod'

export const patientSchema = z.object({
  full_name: z
    .string({ required_error: 'FullName is required' })
    .min(1, { message: 'FullName is required' }),
  patient_number: z
    .string({ required_error: 'Patient number is required' })
    .min(1, { message: 'Patient number is required' }),
  patient_status: z.any().superRefine((val, ctx) => {
    if (!val?.value)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Visit type is required',
      })
  }),
  phone_number: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?\d{8,12}$/, {
      message: 'Please provide a valid phone number.',
    }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
})
