'use client'

import React, { FC, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

import { Button, Icon } from '@/app/components'
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/app/components/dialog'
import {
  ControlledSelect,
  ControlledSwitch,
  ControlledTimeField,
  OptionalErrorMessage,
  WrappedInput,
} from '@/app/components/form'
import {
  AVAILABILITY_DAYS,
  NOTIFICATION_LIST,
  TIMEZONE_SELECT,
} from '@/constants'
import { siteDetailsSchema } from '@/utils/zod'
import { patchSiteConfiguration } from '@/app/actions'
import { addToastToStack, parseError } from '@/utils'
import { getSiteConfiguration, queryClient, QueryKey } from '@/query'
import { ApiResponse, ISiteConfiguration } from '@/types/api'
import { getAuthTokenFromCookies } from '@/utils/cookie'
import {
  formatSiteConfigurationFormData,
  formatSiteConfigurationPatchData,
} from '@/utils/data'

interface SiteConfigurationDialogProps {}

const SiteConfigurationDialog: FC<SiteConfigurationDialogProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const authToken = getAuthTokenFromCookies()

  type FormType = z.input<typeof siteDetailsSchema>

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(siteDetailsSchema),
  })

  const { data: configurationSiteData } = useQuery<
    ApiResponse<ISiteConfiguration>
  >({
    queryKey: [QueryKey.SITE_CONFIGURATION],
    queryFn: () => getSiteConfiguration({ authToken }),
  })

  useEffect(() => {
    const { status, data } = configurationSiteData || {}

    if (status !== 200 || !data) return

    const formData = formatSiteConfigurationFormData(data)

    reset(formData)
  }, [configurationSiteData])

  const handleSubmitForm = (data: FormType) => {
    setIsLoading(true)

    const formattedData = formatSiteConfigurationPatchData(data)

    patchSiteConfiguration(formattedData)
      .then((res) => {
        if (res.status === 200) {
          addToastToStack({
            variant: 'success',
            title: 'Success',
            description: 'Successfully updated',
          })

          queryClient.invalidateQueries({
            queryKey: [QueryKey.SITE_CONFIGURATION],
          })
          setIsDialogOpen(false)
          return
        }

        const errorMessage = parseError(res, 'Something went wrong')
        if (errorMessage)
          addToastToStack({
            variant: 'danger',
            title: 'Error',
            description: errorMessage,
          })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          iconSlotLeft={
            <Icon
              name="icon-settings"
              size={24}
              className="duration-300 ease-in-out group-hocus:rotate-90"
            />
          }
        >
          Site configuration
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay contentPosition="right">
          <DialogContent
            variant="create"
            position="right"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>Site configuration</DialogHeader>
            <form className="hide-scrollbar grid flex-grow content-start gap-y-4 overflow-auto p-6">
              <h3 className="font-bold">Site details</h3>
              <WrappedInput
                labelContent="Site name"
                placeholder="Enter site name"
                errors={errors}
                {...register('name')}
              />
              <WrappedInput
                labelContent="Site Address"
                placeholder="Enter site Address"
                errors={errors}
                {...register('address')}
              />

              <h3 className="mt-4 font-bold">Contact details</h3>
              <WrappedInput
                labelContent="Phone number"
                placeholder="Enter phone number"
                errors={errors}
                {...register('contact_number')}
              />
              <WrappedInput
                labelContent="Email"
                placeholder="Enter email"
                errors={errors}
                {...register('contact_email')}
              />

              <h3 className="mt-4 font-bold">Site availability</h3>
              <ControlledSelect
                labelContent="Timezone"
                placeholder="Select timezone"
                options={TIMEZONE_SELECT}
                name="availability.timezone"
                control={control}
                errorMessage={errors?.availability?.timezone?.message?.toString()}
              />

              <div className="mt-2 grid gap-y-3 border-t border-neutral-200 pt-6">
                {AVAILABILITY_DAYS.map(({ dayOfWeek, name }) => {
                  // @ts-ignore
                  const isDayActive = watch(`availability.${name}.isWorking`)

                  return (
                    <div
                      key={dayOfWeek}
                      className="grid grid-cols-[1fr_auto] items-center gap-x-3"
                    >
                      <ControlledSwitch
                        name={`availability.${name}.isWorking`}
                        control={control}
                        labelHeading={dayOfWeek}
                        className="flex-grow"
                      />
                      {isDayActive ? (
                        <div className="grid grid-cols-[150px_10px_150px] items-center gap-x-3">
                          <ControlledTimeField
                            control={control}
                            name={`availability.${name}.start`}
                            hourCycle={24}
                            label={`Availability time from for ${dayOfWeek}`}
                            hideLabel
                            className="min-w-[150px]"
                          />
                          <span className="text-sm text-neutral-400">–</span>
                          <ControlledTimeField
                            control={control}
                            name={`availability.${name}.end`}
                            hourCycle={24}
                            label={`Availability time to for ${dayOfWeek}`}
                            hideLabel
                            className="min-w-[150px]"
                          />
                        </div>
                      ) : (
                        <div className="grid h-9 w-[334px] items-center rounded-lg border border-neutral-100 bg-neutral-50 px-4 text-sm text-neutral-600">
                          Closed
                        </div>
                      )}
                      <OptionalErrorMessage
                        errorText={
                          (errors as any)?.availability?.[name]?.message
                        }
                        className="col-span-full mt-1.5"
                      />
                    </div>
                  )
                })}
              </div>

              <h3 className="mt-4 font-bold">Notification</h3>
              <ControlledSelect
                menuPlacement="top"
                labelContent="Remind"
                placeholder="Select remind"
                options={NOTIFICATION_LIST}
                name="default_patient_reminder_hours"
                control={control}
                errorMessage={errors.default_patient_reminder_hours?.message?.toString()}
              />
            </form>
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
                  loadingText="Save changes"
                  onClick={handleSubmit(handleSubmitForm)}
                  isLoading={isLoading}
                  className="min-w-[131px]"
                >
                  Save changes
                </Button>
              }
            />
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SiteConfigurationDialog
