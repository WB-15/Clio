import { z } from 'zod'

export const patientSchema = z.object({
  first_name: z
    .string({ required_error: 'FirstName is required' })
    .min(1, { message: 'FirstName is required' }),
  last_name: z
    .string({ required_error: 'LastName is required' })
    .min(1, { message: 'LastName is required' }),
  patient_number: z
    .string({ required_error: 'Patient number is required' })
    .min(1, { message: 'Patient number is required' }),
  phone_number: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?\d{8,12}$/, {
      message: 'Please provide a valid phone number.',
    }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
})
