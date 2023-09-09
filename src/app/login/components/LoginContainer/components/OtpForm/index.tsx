import { FC, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/components'
import { postUserAuthVerify } from '@/query'
import { addToastToStack, getUserMainPath, parseError } from '@/utils'
import { setAuthCookiesAndRedirect } from '@/app/actions/cookies'
import { ApiResponse, IUserWithToken } from '@/types/api'

import FormHeading from '../FormHeading'
import WrappedOtpInput from './components/WrappedOtpInput'

interface OtpFormProps {
  email: string
  handlePrevStep: () => void
}

const OtpForm: FC<OtpFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { email, handlePrevStep } = props

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

  const { mutateAsync: mutateUserAuth } = useMutation({
    mutationFn: postUserAuthVerify,
    // Auth error
    onError: (error) => {
      console.error('Auth error: ', error)
    },
  })

  const onSubmit = (formData: FormType) => {
    setIsLoading(true)
    mutateUserAuth({
      email,
      code: formData.otpCode || '',
    }).then((response) => {
      const { data } = response as ApiResponse<IUserWithToken>
      const errorMessage = parseError(
        data,
        'Something went wrong please try again'
      )

      const authToken = data?.token
      if (authToken) {
        localStorage.setItem('user', JSON.stringify(data?.user))
        setAuthCookiesAndRedirect(
          data?.token,
          getUserMainPath({
            isSiteUser: data?.user?.is_site_user,
            isPatient: data?.user?.is_patient,
            isCra: data?.user?.is_cra,
          })
        )

        return
      }

      setIsLoading(false)
      addToastToStack({
        title: 'Error',
        variant: 'danger',
        description: errorMessage,
      })
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
        isLoading={isLoading}
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
