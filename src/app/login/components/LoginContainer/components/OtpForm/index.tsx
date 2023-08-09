import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/components'
import { postUserAuthVerify } from '@/query'
import { addToastToStack, parseError } from '@/utils'
import { RouteURL } from '@/constants'

import FormHeading from '../FormHeading'
import WrappedOtpInput from './components/WrappedOtpInput'

interface OtpFormProps {
  email: string
  handlePrevStep: () => void
}

const OtpForm: FC<OtpFormProps> = (props) => {
  const { email, handlePrevStep } = props
  const router = useRouter()

  const schema = z.object({
    otpCode: z.string().min(4, 'Code must be 4 digits').default(''),
  })

  type FormType = z.input<typeof schema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: mutateUserAuth, isPending } = useMutation({
    mutationFn: postUserAuthVerify,
    // Auth error
    onError: (error) => {
      console.error('Auth error: ', error)
    },
  })

  const onSubmit = (formData: FormType) => {
    mutateUserAuth({ email, code: formData.otpCode || '' }).then((response) => {
      const errorMessage = parseError(response)

      if (errorMessage) {
        addToastToStack({
          title: 'Error',
          variant: 'danger',
          description: errorMessage,
        })

        return
      }

      router.push(RouteURL.SITE)
    })
  }

  return (
    <form className="grid text-center" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading
        heading="Only one thing is left!"
        description={`We've sent a verification code to ${email}. Enter it to access.`}
      />

      <WrappedOtpInput name="otpCode" control={control} errors={errors} />

      <Button
        type="submit"
        variant="primary"
        className="mt-2"
        loadingText="Confirm"
        isLoading={isPending}
      >
        Confirm
      </Button>

      <span className="mt-6 text-sm font-medium leading-3.5">
        Did not receive the email?
      </span>

      <div className="mt-3 text-sm text-neutral-600">
        Please, check your spam filter,
        <button type="button" onClick={handlePrevStep} className="inline-link">
          or try to use another email address
        </button>
      </div>
    </form>
  )
}

export default OtpForm
