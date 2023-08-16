import React, { FC } from 'react'

import { WrappedInput } from '@/app/components/form'
import VisitWindowsAccordion from '../VisitWindowsAccordion'

interface CreateTrialFormProps {}

const CreateTrialForm: FC<CreateTrialFormProps> = () => {
  return (
    <form className="grid gap-8">
      {/* Point of Contact */}
      <div className="grid gap-4">
        <h3 className="font-bold">Point of Contact</h3>
        <WrappedInput labelContent="Trial name" />
        <WrappedInput labelContent="Name of cordinator" />
        <WrappedInput labelContent="Contact number" />
      </div>

      <VisitWindowsAccordion />
    </form>
  )
}

export default CreateTrialForm
