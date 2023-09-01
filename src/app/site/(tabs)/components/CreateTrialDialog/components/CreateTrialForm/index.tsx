import React, { FC } from 'react'
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { z } from 'zod'

import { WrappedInput } from '@/app/components/form'
import { trialSchema } from '@/utils/zod'

import VisitWindowsAccordion from '../VisitWindowsAccordion'

interface CreateTrialFormProps {
  watch: UseFormWatch<z.input<typeof trialSchema>>
  register: UseFormRegister<z.input<typeof trialSchema>>
  getValues: UseFormGetValues<z.input<typeof trialSchema>>
  control: Control<any>
  errors: any
}

const CreateTrialForm: FC<CreateTrialFormProps> = (props) => {
  const { register, control, watch, getValues, errors } = props

  return (
    <form className="grid gap-8" onSubmit={(e) => e.preventDefault()}>
      {/* Point of Contact */}
      <div className="grid gap-4 px-6">
        <h3 className="font-bold">Point of Contact</h3>
        <WrappedInput
          placeholder="Enter trial name"
          labelContent="Trial name"
          errors={errors}
          {...register('name')}
        />
        <WrappedInput
          placeholder="Enter name of cordinator"
          labelContent="Name of cordinator"
          errors={errors}
          {...register('contact_name')}
        />
        <WrappedInput
          placeholder="Enter contact number"
          labelContent="Contact number"
          errors={errors}
          {...register('contact_number')}
        />
      </div>

      <VisitWindowsAccordion
        register={register}
        control={control}
        watch={watch}
        getValues={getValues}
        errors={errors}
      />
    </form>
  )
}

export default CreateTrialForm
