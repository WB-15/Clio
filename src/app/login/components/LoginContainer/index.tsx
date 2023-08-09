'use client'

import { FC, useState } from 'react'

import EmailForm from './components/EmailForm'
import OtpForm from './components/OtpForm'

interface LoginContainerProps {}

const LoginContainer: FC<LoginContainerProps> = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('LOGIN')
  const [email, setEmail] = useState('')

  const handleNextStep = () => {
    setCurrentStep('OTP')
  }

  const handlePrevStep = () => {
    setCurrentStep('LOGIN')
  }

  const STEPS = {
    LOGIN: (
      <EmailForm
        handleNextStep={handleNextStep}
        handleUserEmail={(value) => setEmail(value)}
      />
    ),
    OTP: <OtpForm handlePrevStep={handlePrevStep} email={email} />,
  }

  type StepType = keyof typeof STEPS

  return (
    <div className="max-w-[356px] rounded-xl border border-neutral-100 bg-white px-5 py-6">
      {STEPS[currentStep]}
    </div>
  )
}

export default LoginContainer
