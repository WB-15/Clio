import React, { FC } from 'react'
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'

import { WrappedInput } from '@/app/components/form'
import { createTrialSchema } from '@/utils/zod'

import VisitWindowsAccordion from '../VisitWindowsAccordion'

interface CreateTrialFormProps {
  watch: UseFormWatch<z.input<typeof createTrialSchema>>
  register: UseFormRegister<z.input<typeof createTrialSchema>>
  control: Control<any>
}

const CreateTrialForm: FC<CreateTrialFormProps> = (props) => {
  const { register, control, watch } = props

  return (
    <form className="grid gap-8">
      {/* Point of Contact */}
      <div className="grid gap-4 px-6">
        <h3 className="font-bold">Point of Contact</h3>
        <WrappedInput
          placeholder="Enter trial name"
          labelContent="Trial name"
          {...register('name')}
        />
        <WrappedInput
          placeholder="Enter name of cordinator"
          labelContent="Name of cordinator"
          {...register('contact_name')}
        />
        <WrappedInput
          placeholder="Enter contact number"
          labelContent="Contact number"
          {...register('contact_number')}
        />
      </div>

      <VisitWindowsAccordion
        register={register}
        control={control}
        watch={watch}
      />
    </form>
  )
}

export default CreateTrialForm
