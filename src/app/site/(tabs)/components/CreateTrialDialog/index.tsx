'use client'

import React, { FC, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { trialSchema } from '@/utils/zod'
import { Button, Icon } from '@/app/components'
import { createTrial } from '@/app/actions'
import { revalidateTrialListPath } from '@/app/actions/revalidate'
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
  const [isLoading, setIsLoading] = useState(false)
  type FormType = z.input<typeof trialSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(trialSchema),
    defaultValues: {
      visit_windows: [{}],
    },
  })

  const handleCreateDialogOpen = (open: boolean) => {
    if (open) reset()
    setIsCreateDialogOpen(open)
  }

  const handleSubmitForm = (data: FormType) => {
    setIsLoading(true)
    createTrial(data).then((res) => {
      setIsLoading(false)
      const { status, data: resData } = res

      if (status >= 200 && status <= 299) {
        addToastToStack({
          variant: 'success',
          title: 'Success',
          description: 'Trial has been created successfully',
        })

        revalidateTrialListPath()
        handleCreateDialogOpen(false)

        return
      }

      addToastToStack({
        variant: 'danger',
        title: 'Error',
        description: parseError(
          resData ||
            'Something went wrong! A new trial was not created. Please try again later'
        ),
      })
    })
  }

  return (
    <Dialog.Root
      open={isCreateDialogOpen}
      onOpenChange={handleCreateDialogOpen}
    >
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
            variant="create"
            position="right"
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
                  onClick={handleSubmit(handleSubmitForm)}
                  isLoading={isLoading}
                  className="min-w-[94px]"
                  loadingText="Confirm"
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
