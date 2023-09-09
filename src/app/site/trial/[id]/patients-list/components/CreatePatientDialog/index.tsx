import { zodResolver } from '@hookform/resolvers/zod'
import {
  Close as RadixDialogClose,
  Portal as RadixDialogPortal,
  Dialog as RadixDialogRoot,
  Trigger as RadixDialogTrigger,
} from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button, Icon } from '@/app/components'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from '@/app/components/dialog'
import { WrappedInput } from '@/app/components/form'
import VisitWindows from '@/app/site/trial/[id]/patients-list/components/VisitWindows'
import { IVisitWindow } from '@/types/api'
import { patientSchema } from '@/utils/zod'
import { postPatient } from '@/app/actions/patient'
import { postVisit } from '@/app/actions/visit'
import { addToastToStack } from '@/utils'

interface CreatePatientDialogProps {
  visitWindows?: IVisitWindow[]
  trailId: string
  authToken: string
}

const CreatePatientDialog: FC<CreatePatientDialogProps> = (props) => {
  const { visitWindows, trailId, authToken } = props
  const router = useRouter()
  type FormType = z.input<typeof patientSchema>
  const [visitWindowsData, setVisitWindowsData] = useState<IVisitWindow[]>(
    visitWindows?.map((item) => ({
      ...item,
      visit_datetime: dayjs().add(item.visit_day, 'days'),
    })) || []
  )
  const [openModal, setOpenModal] = useState<boolean>(false)

  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      patient_number: '',
      visit_windows: visitWindows,
      phone_number: '',
      email: '',
    }),
    [visitWindows]
  )

  const {
    register,
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
    const user = JSON.parse(localStorage.getItem('user')!)
    const visitData = visitWindowsData.map((item) => ({
      visit_window_id: item.visit_window_id,
      visit_datetime: dayjs(item.visit_datetime),
    }))

    const patientData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone_number,
      patient_number: formData.patient_number,
      user_id: user?.user_id,
      screening_visit: dayjs(),
    }

    postPatient(patientData, trailId, { authToken })
      .then((res) => {
        if (!(res.status >= 400 && res.status <= 499)) {
          const data = res?.data as unknown as { patient_id: string }
          postVisit(visitData, trailId, data?.patient_id, { authToken })
          addToastToStack({
            variant: 'success',
            title: 'Success',
            description: 'Patient has been added successfully',
          })
          setOpenModal(false)
          router.refresh()
          return
        }

        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: 'Something went wrong! Try again later',
        })
      })
      .catch(() =>
        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: 'Something went wrong! Try again later',
        })
      )
  }

  const handleSetVisitWindowData = (value: IVisitWindow) => {
    const newVisitWindow = [...visitWindowsData].map((item) => {
      if (item.visit_window_id === value.visit_window_id) return value
      return item
    })
    setVisitWindowsData(newVisitWindow)
  }

  return (
    <RadixDialogRoot open={openModal} onOpenChange={setOpenModal}>
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
                  labelContent="First patient name"
                  placeholder="Enter first name of patient"
                  errors={errors}
                  {...register('first_name')}
                />
                <WrappedInput
                  labelContent="Last patient name"
                  placeholder="Enter last name of patient"
                  errors={errors}
                  {...register('last_name')}
                />
                <WrappedInput
                  labelContent="Patient number"
                  placeholder="Enter patient number"
                  errors={errors}
                  {...register('patient_number')}
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
