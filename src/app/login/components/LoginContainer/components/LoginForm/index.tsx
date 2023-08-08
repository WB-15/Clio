'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/components'
import { WrappedInput } from '@/app/components/form'

import FormHeading from '../FormHeading'

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const schema = z.object({
    login: z.string().min(1, 'Email or mobile is required'),
  })

  type FormType = z.input<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (formData: FormType) => {
    console.log(formData.login)
  }

  return (
    <form className="grid" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading
        heading="Glad to see you!"
        description="Enter email for verification code or mobile for SMS authentication"
      />

      <WrappedInput
        labelContent="Email or mobile"
        placeholder="Enter your email or mobile"
        classNameGroup="mt-8"
        errors={errors}
        {...register('login')}
      />

      <Button type="submit" variant="primary" className="mt-2">
        Get code
      </Button>
    </form>
  )
}

export default LoginForm
