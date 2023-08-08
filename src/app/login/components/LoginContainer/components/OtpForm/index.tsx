'use client'

import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/components'

import FormHeading from '../FormHeading'
import WrappedOtpInput from './components/WrappedOtpInput'

interface OtpFormProps {}

const OtpForm: FC<OtpFormProps> = () => {
  const schema = z.object({
    otpCode: z.string().min(4, 'Code must be 4 digits'),
  })

  type FormType = z.input<typeof schema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (formData: FormType) => {
    console.log(formData.otpCode)
  }

  return (
    <form className="grid text-center" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading
        heading="Only one thing is left!"
        description="We've sent a verification code to name@email.com. Enter it to access."
      />

      <WrappedOtpInput name="otpCode" control={control} errors={errors} />

      <Button type="submit" variant="primary" className="mt-2">
        Get code
      </Button>

      <span className="mt-6 text-sm font-medium leading-3.5">
        Did not receive the SMS?
      </span>

      <span className="mt-3">
        <button type="button" className="inline-link">
          Click here
        </button>{' '}
        to send new one <br /> or{' '}
        <button type="button" className="inline-link">
          try to use another phone number
        </button>
      </span>
    </form>
  )
}

export default OtpForm
