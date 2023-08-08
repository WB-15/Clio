import { FC } from 'react'

import LoginForm from './components/LoginForm'
import OtpForm from './components/OtpForm'

interface LoginContainerProps {}

const LoginContainer: FC<LoginContainerProps> = () => {
  return (
    <div className="max-w-[356px] rounded-xl border border-neutral-100 bg-white px-5 py-6">
      <LoginForm />
      <OtpForm />
    </div>
  )
}

export default LoginContainer
