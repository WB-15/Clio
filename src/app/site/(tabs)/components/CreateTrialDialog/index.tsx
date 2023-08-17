'use client'

import React, { FC } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createTrialSchema } from '@/utils/zod'
import { Button, Icon } from '@/app/components'
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/app/components/dialog'
import CreateTrialForm from './components/CreateTrialForm'

interface CreateTrialDialogProps {}

const CreateTrialDialog: FC<CreateTrialDialogProps> = () => {
  type FormType = z.input<typeof createTrialSchema>

  const { register, control, handleSubmit, watch } = useForm<FormType>({
    resolver: zodResolver(createTrialSchema),
    defaultValues: {
      visit_windows: [{}],
    },
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="primary"
          iconSlotLeft={<Icon size={20} name="icon-plus" />}
        >
          Create Trial
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay contentPosition="right">
          <DialogContent
            position="right"
            classNameInner="h-[calc(100vh-20px)] w-[566px]"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>Create Trial</DialogHeader>
            <div className="hide-scrollbar flex-grow overflow-auto py-6">
              <CreateTrialForm
                register={register}
                control={control}
                watch={watch}
              />
            </div>
            <DialogFooter
              buttonSlotSecondary={
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
              }
              buttonSlotPrimary={
                <Button
                  type="submit"
                  variant="primary"
                  onClick={handleSubmit((data) => console.log(data))}
                >
                  Confirm
                </Button>
              }
            />
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateTrialDialog
