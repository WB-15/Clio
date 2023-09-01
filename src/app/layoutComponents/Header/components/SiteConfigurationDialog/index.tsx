'use client'

import React, { FC, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { allTimezones, useTimezoneSelect } from 'react-timezone-select'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { AVAILABILITY_DAYS, NOTIFICATION_LIST } from '@/constants'
import { siteDetailsSchema } from '@/utils/zod'
import { patchSiteConfiguration } from '@/app/actions/patchServerConfiguration'
import { addToastToStack } from '@/utils'

interface SiteConfigurationDialogProps {}

const SiteConfigurationDialog: FC<SiteConfigurationDialogProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { options: timezoneOptions } = useTimezoneSelect({
    labelStyle: 'original',
    timezones: allTimezones,
  })

  type FormType = z.input<typeof siteDetailsSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(siteDetailsSchema),
  })

  const handleSubmitForm = (data: FormType) => {
    setIsLoading(true)

    const {
      timezone,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    } = data.availability

    const formattedData = {
      ...data,
      default_patient_reminder_hours: parseFloat(
        data.default_patient_reminder_hours?.value
      ),
      availability: {
        timezone: timezone?.value,
        hours: {
          sunday: sunday.isWorking
            ? {
                start: {
                  hour: sunday.start?.hour,
                  minute: sunday.start?.minute,
                },
                end: { hour: sunday.end?.hour, minute: sunday.end?.minute },
              }
            : null,
          monday: monday.isWorking
            ? {
                start: {
                  hour: monday.start?.hour,
                  minute: monday.start?.minute,
                },
                end: { hour: monday.end?.hour, minute: monday.end?.minute },
              }
            : null,
          tuesday: tuesday.isWorking
            ? {
                start: {
                  hour: tuesday.start?.hour,
                  minute: tuesday.start?.minute,
                },
                end: { hour: tuesday.end?.hour, minute: tuesday.end?.minute },
              }
            : null,
          wednesday: wednesday.isWorking
            ? {
                start: {
                  hour: wednesday.start?.hour,
                  minute: wednesday.start?.minute,
                },
                end: {
                  hour: wednesday.end?.hour,
                  minute: wednesday.end?.minute,
                },
              }
            : null,
          thursday: thursday.isWorking
            ? {
                start: {
                  hour: thursday.start?.hour,
                  minute: thursday.start?.minute,
                },
                end: {
                  hour: thursday.end?.hour,
                  minute: thursday.end?.minute,
                },
              }
            : null,
          friday: friday.isWorking
            ? {
                start: {
                  hour: friday.start?.hour,
                  minute: friday.start?.minute,
                },
                end: {
                  hour: friday.end?.hour,
                  minute: friday.end?.minute,
                },
              }
            : null,
          saturday: saturday.isWorking
            ? {
                start: {
                  hour: saturday.start?.hour,
                  minute: saturday.start?.minute,
                },
                end: {
                  hour: saturday.end?.hour,
                  minute: saturday.end?.minute,
                },
              }
            : null,
        },
      },
    }

    patchSiteConfiguration(formattedData)
      .then((res) => {
        if (res.status === 200) {
          addToastToStack({
            variant: 'success',
            title: 'Success',
            description: 'Successfully updated',
          })

          setIsDialogOpen(false)
        }
      })
      .catch((err) => console.log(err))
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
                options={timezoneOptions}
                name="availability.timezone"
                control={control}
                errorMessage={errors?.availability?.timezone?.message?.toString()}
              />

              <div className="mt-2 grid gap-y-3 border-t border-neutral-200 pt-6">
                {AVAILABILITY_DAYS.map(({ dayOfWeek, name }) => (
                  <div
                    key={dayOfWeek}
                    className="grid grid-cols-[1fr_150px_10px_150px] items-center gap-x-3"
                  >
                    <ControlledSwitch
                      name={`availability.${name}.isWorking`}
                      control={control}
                      labelHeading={dayOfWeek}
                      className="flex-grow"
                    />
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
                    <OptionalErrorMessage
                      errorText={(errors as any)?.availability?.[name]?.message}
                      className="col-span-full mt-1.5"
                    />
                  </div>
                ))}
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
