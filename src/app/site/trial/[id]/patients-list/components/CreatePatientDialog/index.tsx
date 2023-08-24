import React, { FC } from 'react'
import {
  Dialog as RadixDialogRoot,
  Trigger as RadixDialogTrigger,
  Portal as RadixDialogPortal,
  Close as RadixDialogClose,
} from '@radix-ui/react-dialog'
import { Button, Icon } from '@/app/components'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from '@/app/components/dialog'
import { WrappedInput, WrappedSelect } from '@/app/components/form'
import { PATIENT_STATUSES } from '@/constants'
import { IVisitWindow } from '@/types/api'
import VisitWindows from '@/app/site/trial/[id]/patients-list/components/VisitWindows'

interface CreatePatientDialogProps {
  visitWindows?: IVisitWindow[]
}

const CreatePatientDialog: FC<CreatePatientDialogProps> = (props) => {
  const { visitWindows } = props

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
          >
            <DialogHeader>Add patient to trial</DialogHeader>
            <div className="hide-scrollbar flex-grow overflow-auto px-6 pb-12 pt-6">
              <form className="grid gap-y-4">
                <h3 className="font-bold">Basic Information</h3>
                <WrappedInput
                  labelContent="Full patient name"
                  placeholder="Enter name of patient"
                />
                <WrappedInput
                  labelContent="Patient number"
                  placeholder="Enter patient number"
                />
                <WrappedSelect
                  placeholder="Patient status"
                  labelContent="Select patient status"
                  options={PATIENT_STATUSES}
                />
                <WrappedInput
                  labelContent="Phone number"
                  placeholder="Enter patient’s phone number"
                />
                <WrappedInput
                  labelContent="Email"
                  placeholder="Enter patient’s email"
                />
                <h3 className="mt-4">Visits</h3>
                {visitWindows?.length && (
                  <VisitWindows visitWindows={visitWindows} />
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
                <Button type="submit" variant="primary">
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
