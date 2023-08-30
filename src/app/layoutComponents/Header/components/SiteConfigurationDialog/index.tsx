'use client'

import React, { FC } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { allTimezones, useTimezoneSelect } from 'react-timezone-select'

import { Button, Icon } from '@/app/components'
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/app/components/dialog'
import {
  TimeField,
  WrappedInput,
  WrappedSelect,
  WrappedSwitch,
} from '@/app/components/form'
import { AVAILABILITY_DAYS, NOTIFICATION_LIST } from '@/constants'

interface SiteConfigurationDialogProps {}

const SiteConfigurationDialog: FC<SiteConfigurationDialogProps> = () => {
  const { options: timezoneOptions } = useTimezoneSelect({
    labelStyle: 'original',
    timezones: allTimezones,
  })

  return (
    <Dialog.Root>
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
              />
              <WrappedInput
                labelContent="Site Address"
                placeholder="Enter site Address"
              />

              <h3 className="mt-4 font-bold">Contact details</h3>
              <WrappedInput
                labelContent="Phone number"
                placeholder="Enter phone number"
              />
              <WrappedInput labelContent="Email" placeholder="Enter email" />

              <h3 className="mt-4 font-bold">Site availability</h3>
              <WrappedSelect
                labelContent="Timezone"
                placeholder="Select timezone"
                options={timezoneOptions}
              />

              <div className="mt-2 grid gap-y-3 border-t border-neutral-200 pt-6">
                {AVAILABILITY_DAYS.map(({ dayOfWeek }) => (
                  <div key={dayOfWeek} className="flex items-center gap-x-3">
                    <WrappedSwitch
                      labelHeading={dayOfWeek}
                      className="flex-grow"
                    />
                    <TimeField
                      hourCycle={24}
                      label={`Availability time from for ${dayOfWeek}`}
                      hideLabel
                      className="min-w-[150px]"
                    />
                    <span className="text-sm text-neutral-400">–</span>
                    <TimeField
                      hourCycle={24}
                      label={`Availability time to for ${dayOfWeek}`}
                      hideLabel
                      className="min-w-[150px]"
                    />
                  </div>
                ))}
              </div>

              <h3 className="mt-4 font-bold">Notification</h3>
              <WrappedSelect
                menuPlacement="top"
                labelContent="Remind"
                placeholder="Select remind"
                options={NOTIFICATION_LIST}
              />
            </form>
            <DialogFooter
              buttonSlotSecondary={
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
              }
              buttonSlotPrimary={
                <Button type="submit" variant="primary" loadingText="Confirm">
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
