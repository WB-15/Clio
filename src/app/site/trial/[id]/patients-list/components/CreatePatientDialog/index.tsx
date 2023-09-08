import { zodResolver } from '@hookform/resolvers/zod'
import {
  Close as RadixDialogClose,
  Portal as RadixDialogPortal,
  Dialog as RadixDialogRoot,
  Trigger as RadixDialogTrigger,
} from '@radix-ui/react-dialog'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import dayjs from 'dayjs'
import { Button, Icon } from '@/app/components'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from '@/app/components/dialog'
import { ControlledSelect, WrappedInput } from '@/app/components/form'
import VisitWindows from '@/app/site/trial/[id]/patients-list/components/VisitWindows'
import { PATIENT_STATUSES } from '@/constants'
import { IVisitWindow } from '@/types/api'
import { patientSchema } from '@/utils/zod'

interface CreatePatientDialogProps {
  visitWindows?: IVisitWindow[]
}

const CreatePatientDialog: FC<CreatePatientDialogProps> = (props) => {
  const { visitWindows } = props
  type FormType = z.input<typeof patientSchema>
  const [visitWindowsData, setVisitWindowsData] = useState<IVisitWindow[]>(
    visitWindows?.map((item) => ({
      ...item,
      visit_datetime: dayjs().add(item.visit_day, 'days'),
    })) || []
  )

  const defaultValues = useMemo(
    () => ({
      full_name: '',
      patient_number: '',
      patient_status: PATIENT_STATUSES[0],
      visit_windows: visitWindows,
      phone_number: '',
      email: '',
    }),
    [visitWindows]
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const onSubmit = (formData: FormType) => {
    console.log(formData)
  }

  const handleSetVisitWindowData = (value: IVisitWindow) => {
    const newVisitWindow = [...visitWindowsData].map((item) => {
      if (item.visit_window_id === value.visit_window_id) return value
      return item
    })
    setVisitWindowsData(newVisitWindow)
  }

  return (
    <RadixDialogRoot>
      <RadixDialogTrigger asChild>
        <Button
          variant="primary"
          iconSlotLeft={<Icon name="icon-plus" size={20} />}
        >
          Add patient
        </Button>
      </RadixDialogTrigger>
      <RadixDialogPortal>
        <DialogOverlay contentPosition="right">
          <DialogContent
            variant="create"
            position="right"
            onInteractOutside={(e) => e.preventDefault()}
            className="max-w-[630px]"
          >
            <DialogHeader>Add patient to trial</DialogHeader>
            <div className="hide-scrollbar flex-grow overflow-auto px-6 pb-12 pt-6">
              <form
                className="grid gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
                id="add-patient"
              >
                <h3 className="font-bold">Basic Information</h3>
                <WrappedInput
                  labelContent="Full patient name"
                  placeholder="Enter name of patient"
                  errors={errors}
                  {...register('full_name')}
                />
                <WrappedInput
                  labelContent="Patient number"
                  placeholder="Enter patient number"
                  errors={errors}
                  {...register('patient_number')}
                />
                <ControlledSelect
                  placeholder="Patient status"
                  labelContent="Patient status"
                  options={PATIENT_STATUSES}
                  defaultValue={PATIENT_STATUSES[0]}
                  name="patient_status"
                  control={control}
                  errorMessage={errors?.patient_status?.message?.toString()}
                />
                <WrappedInput
                  labelContent="Phone number"
                  placeholder="Enter patient’s phone number"
                  errors={errors}
                  {...register('phone_number')}
                />
                <WrappedInput
                  labelContent="Email"
                  placeholder="Enter patient’s email"
                  errors={errors}
                  {...register('email')}
                />
                <h3 className="mt-4">Visits</h3>
                {visitWindowsData?.length && (
                  <VisitWindows
                    visitWindows={visitWindowsData}
                    setVisitWindowsData={handleSetVisitWindowData}
                  />
                )}
              </form>
            </div>
            <DialogFooter
              buttonSlotSecondary={
                <RadixDialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </RadixDialogClose>
              }
              buttonSlotPrimary={
                <Button type="submit" variant="primary" form="add-patient">
                  Add patient
                </Button>
              }
            />
          </DialogContent>
        </DialogOverlay>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}

export default CreatePatientDialog
