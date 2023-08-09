import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/app/components'
import { WrappedInput } from '@/app/components/form'
import { postUserAuth } from '@/query'
import { addToastToStack, parseError } from '@/utils'

import FormHeading from '../FormHeading'

interface LoginFormProps {
  handleNextStep: () => void
  handleUserEmail: (email: string) => void
}

const EmailForm: FC<LoginFormProps> = (props) => {
  const { handleNextStep, handleUserEmail } = props

  const schema = z.object({
    email: z.string().email('Invalid email address'),
  })

  type FormType = z.input<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: mutateUserAuth, isPending } = useMutation({
    mutationFn: postUserAuth,
    // Auth error
    onError: (error) => {
      console.error('Auth error: ', error)
    },
  })

  const onSubmit = (formData: FormType) => {
    mutateUserAuth({ email: formData.email }).then((response) => {
      const errorMessage = parseError(response)

      if (errorMessage) {
        addToastToStack({
          title: 'Error',
          variant: 'danger',
          description: errorMessage,
        })

        return
      }

      if (response === 'OK') {
        handleUserEmail(formData.email)
        handleNextStep()

        return
      }

      addToastToStack({
        title: 'Error',
        variant: 'danger',
        description: 'Something went wrong please try again',
      })
    })
  }

  return (
    <form noValidate className="grid" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading
        heading="Glad to see you!"
        description="Enter email for verification code or mobile for SMS authentication"
      />

      <WrappedInput
        id="email"
        type="email"
        autoFocus
        labelContent="Email or mobile"
        placeholder="Enter your email or mobile"
        classNameGroup="mt-8"
        errors={errors}
        {...register('email')}
      />

      <Button
        type="submit"
        variant="primary"
        className="mt-2"
        isLoading={isPending}
        loadingText="Get code"
      >
        Get code
      </Button>
    </form>
  )
}

export default EmailForm
