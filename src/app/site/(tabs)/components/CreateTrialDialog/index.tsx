'use client'

import React, { FC, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createTrialSchema } from '@/utils/zod'
import { Button, Icon } from '@/app/components'
import { actionCreateTrial } from '@/query'
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/app/components/dialog'
import { addToastToStack, parseError } from '@/utils'
import CreateTrialForm from './components/CreateTrialForm'

interface CreateTrialDialogProps {}

const CreateTrialDialog: FC<CreateTrialDialogProps> = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  type FormType = z.input<typeof createTrialSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(createTrialSchema),
    defaultValues: {
      visit_windows: [{}],
    },
  })

  const handleSubmitForm = (data: FormType) => {
    actionCreateTrial(data).then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        addToastToStack({
          variant: 'success',
          title: 'Success',
          description: 'New trial successfully added!',
        })

        setIsCreateDialogOpen(false)
      }

      if (res.status >= 400 && res.status <= 499) {
        addToastToStack({
          variant: 'danger',
          title: 'Error',
          description: parseError(res.data),
        })
      }
    })
  }

  return (
    <Dialog.Root open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                getValues={getValues}
                errors={errors}
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
                  onClick={handleSubmit((data) => handleSubmitForm(data))}
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
