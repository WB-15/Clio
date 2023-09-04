'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEqual } from 'lodash-es'

import { trialSchema } from '@/utils/zod'
import { Button, Icon } from '@/app/components'
import {
  postTrialWithVisitWindows,
  patchVisitWindowWithAuth,
  postVisitWindowsWithAuth,
  patchTrialWithAuth,
} from '@/app/actions/trial'
import {
  revalidateTrialListPath,
  revalidateTrialPath,
} from '@/app/actions/revalidate'
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/app/components/dialog'
import { addToastToStack, parseError } from '@/utils'
import CreateTrialForm from './components/CreateTrialForm'

interface CreateTrialDialogProps {
  trialId?: string
  defaultValues?: z.input<typeof trialSchema>
  trigger?: ReactNode
  requestType?: 'post' | 'patch'
}

const CreateTrialDialog: FC<CreateTrialDialogProps> = ({
  trialId = '',
  trigger,
  defaultValues,
  requestType = 'post',
}: CreateTrialDialogProps) => {
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
    defaultValues: defaultValues || {
      visit_windows: [{}],
    },
  })

  useEffect(() => {
    reset(defaultValues || { visit_windows: [{}] })
  }, [JSON.stringify(defaultValues)])

  const handleCreateDialogOpen = (open: boolean) => {
    if (open) reset()
    setIsCreateDialogOpen(open)
  }

  const getVisitWindowsForPatch = (
    visitWindows: Pick<
      z.input<typeof trialSchema>,
      'visit_windows'
    >['visit_windows']
  ) => {
    return visitWindows.filter((visitWindow) => {
      const existedVisitWindow = defaultValues?.visit_windows.find(
        (value) => value.visit_window_id === visitWindow.visit_window_id
      )

      return existedVisitWindow && !isEqual(visitWindow, existedVisitWindow)
    })
  }

  const getVisitWindowForCreate = (
    visitWindows: Pick<
      z.input<typeof trialSchema>,
      'visit_windows'
    >['visit_windows']
  ) => {
    return visitWindows.filter((visitWindow) => !visitWindow?.visit_window_id)
  }

  const formatVisitWindow = (
    visitWindows: Pick<
      z.input<typeof trialSchema>,
      'visit_windows'
    >['visit_windows']
  ) =>
    visitWindows.map(
      ({
        separate_visit_window,
        window_before_days,
        window_after_days,
        window_buffer,
        visit_type,
        ...rest
      }) => ({
        window_before_days: separate_visit_window
          ? window_before_days || 0
          : window_buffer || 0,
        window_after_days: separate_visit_window
          ? window_after_days || 0
          : window_buffer || 0,
        visit_type: visit_type?.value,
        ...rest,
      })
    )

  const handleSubmitForm = (data: FormType) => {
    if (requestType === 'post') {
      setIsLoading(true)

      postTrialWithVisitWindows(data)
        .then((res) => {
          const { status, data: resData } = res

          if (status >= 200 && status <= 299) {
            addToastToStack({
              variant: 'success',
              title: 'Success',
              description: 'Trial has been created successfully',
            })

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
        .finally(() => setIsLoading(false))

      return
    }

    if (requestType === 'patch') {
      const isTrialChanged =
        data?.name !== defaultValues?.name ||
        data?.contact_name !== defaultValues?.contact_name ||
        data?.contact_number !== defaultValues?.contact_number

      const patchTrialRequest = isTrialChanged
        ? patchTrialWithAuth(trialId, {
            name: data?.name,
            contact_name: data?.contact_name,
            contact_number: data?.contact_number,
          })
        : null

      const formattedVisitWindowForCreate = formatVisitWindow(
        getVisitWindowForCreate(data.visit_windows)
      )

      const formattedVisitWindowForPatch = formatVisitWindow(
        getVisitWindowsForPatch(data.visit_windows)
      )

      const patchRequests = formattedVisitWindowForPatch?.length
        ? formattedVisitWindowForPatch.map((visitWindow) =>
            patchVisitWindowWithAuth({
              trialId,
              visitWindowId: visitWindow.visit_window_id || '',
              data: visitWindow,
            })
          )
        : []

      const postRequest = formattedVisitWindowForCreate?.length
        ? postVisitWindowsWithAuth({
            trialId,
            data: formattedVisitWindowForCreate,
          })
        : null

      const requests = [
        ...patchRequests,
        postRequest,
        patchTrialRequest,
      ].filter((val) => val)

      if (requests?.length) {
        setIsLoading(true)
        Promise.all(requests)
          .then((res) => {
            const hasError = res.find(
              (element) =>
                !element || (element.status >= 400 && element.status <= 499)
            )

            if (hasError) {
              addToastToStack({
                variant: 'danger',
                title: 'Error',
                description: 'Something went wrong! Try again later',
              })

              return
            }

            addToastToStack({
              variant: 'success',
              title: 'Success',
              description: 'Trial has been changed successfully',
            })
          })
          .finally(() => {
            setIsLoading(false)
            setIsCreateDialogOpen(false)
            revalidateTrialListPath()
            revalidateTrialPath()
          })

        return
      }

      setIsCreateDialogOpen(false)
    }
  }

  return (
    <Dialog.Root
      open={isCreateDialogOpen}
      onOpenChange={handleCreateDialogOpen}
    >
      <Dialog.Trigger asChild>
        {trigger || (
          <Button
            variant="primary"
            iconSlotLeft={<Icon size={20} name="icon-plus" />}
          >
            Create Trial
          </Button>
        )}
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
