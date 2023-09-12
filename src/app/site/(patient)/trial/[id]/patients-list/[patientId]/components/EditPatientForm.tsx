import React, { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/app/components'
import { ControlledSelect, WrappedInput } from '@/app/components/form'
import { IPatient } from '@/types/api'
import { PATIENT_STATUSES } from '@/constants'
import { patchPatient } from '@/app/actions/patient/patchPatient'
import { addToastToStack } from '@/utils'

const editPatientSchema = z.object({
  full_name: z
    .string({ required_error: 'FullName is required' })
    .min(1, { message: 'FullName is required' }),
  patient_number: z
    .string({ required_error: 'Patient number is required' })
    .min(1, { message: 'Patient number is required' }),
  phone_number: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?\d{8,12}$/, {
      message: 'Please provide a valid phone number.',
    }),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please provide a valid email.',
    })
    .optional()
    .or(z.literal('')),
  patient_status: z.any(),
})

interface EditPatientFormProps {
  setShowEditForm: (value: boolean) => void
  patientData?: IPatient
  trialId: string
  onSuccess: () => void
}

export const EditPatientForm: FC<EditPatientFormProps> = ({
  setShowEditForm,
  patientData,
  trialId,
  onSuccess,
}) => {
  type FormType = z.input<typeof editPatientSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormType>({
    resolver: zodResolver(editPatientSchema),
    defaultValues: {
      full_name: `${patientData?.first_name} ${patientData?.last_name}`,
      patient_number: patientData?.patient_number,
      phone_number: patientData?.phone,
      email: patientData?.email,
      patient_status:
        PATIENT_STATUSES.find((item) => item.value === patientData?.status) ||
        PATIENT_STATUSES[0],
    },
  })

  const onSubmit = (formData: FormType) => {
    const params = {
      first_name: formData.full_name.split(' ')[0],
      last_name: formData.full_name.split(' ')?.[1],
      email: formData.email,
      phone: formData.phone_number,
      patient_number: formData.patient_number,
      status: formData.patient_status?.value,
    }
    patchPatient(trialId, patientData?.patient_id as string, params).then(
      (res) => {
        const { status } = res

        if (status >= 200 && status <= 299) {
          onSuccess()
          setShowEditForm(false)
          addToastToStack({
            variant: 'success',
            title: 'Success',
            description: 'Patient has been updated successfully',
          })

          return
        }

        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: 'Something went wrong! Try again later',
        })
      }
    )
  }

  return (
    <form
      className="mb-2 flex justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1.5">
        <div className="w-[calc(50%_-_4px)]">
          <WrappedInput
            iconSlotLeft={
              <p className="text-[12px] text-neutral-400">Patient #:</p>
            }
            iconSlotRight={
              <input className="text-right" {...register('patient_number')} />
            }
            errorMessage={errors.patient_number?.message?.toString()}
          />
        </div>
        <div className="flex gap-2">
          <WrappedInput
            iconSlotLeft={
              <p className="text-[12px] text-neutral-400">Full Name:</p>
            }
            iconSlotRight={
              <input {...register('full_name')} className="text-right" />
            }
            errorMessage={errors.full_name?.message?.toString()}
          />
          <WrappedInput
            iconSlotLeft={
              <p className="text-[12px] text-neutral-400">Status:</p>
            }
            iconSlotRight={
              <ControlledSelect
                options={PATIENT_STATUSES}
                name="patient_status"
                control={control}
                selectClassName="border-0"
              />
            }
            iconSlotRightClass="z-10 w-[150px]"
          />
        </div>
        <div className="flex gap-2">
          <WrappedInput
            iconSlotLeft={
              <p className="text-[12px] text-neutral-400">Number:</p>
            }
            iconSlotRight={
              <input {...register('phone_number')} className="text-right" />
            }
            errorMessage={errors.phone_number?.message?.toString()}
            classNameGroup="h-[38px]"
          />
          <WrappedInput
            iconSlotLeft={
              <p className="text-[12px] text-neutral-400">Email:</p>
            }
            iconSlotRight={
              <input {...register('email')} className="text-right" />
            }
            errorMessage={errors.email?.message?.toString()}
            classNameGroup="h-[38px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setShowEditForm(false)
            reset()
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </div>
    </form>
  )
}
