import React, { FC } from 'react'
import dayjs from 'dayjs'
import { parseDate } from '@internationalized/date'

import {
  Close as RadixDialogClose,
  Dialog as RadixDialogRoot,
  Portal as RadixDialogPortal,
  Trigger as RadixDialogTrigger,
} from '@radix-ui/react-dialog'

import { Button, Icon } from '@/app/components'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from '@/app/components/dialog'
import Calendar from '@/app/components/form/Calendar'
import { IVisitWindow } from '@/types/api'

interface EditVisitDialogProps {
  visitWindow: IVisitWindow
}

const EditVisitDialog: FC<EditVisitDialogProps> = (props) => {
  const { visitWindow } = props

  const dayOfVisit = dayjs(visitWindow.created).add(
    visitWindow.visit_day,
    'day'
  )

  return (
    <RadixDialogRoot>
      <RadixDialogTrigger asChild>
        <Button
          variant="outline"
          iconSlotRight={<Icon name="icon-note" size={20} />}
        >
          Edit
        </Button>
      </RadixDialogTrigger>
      <RadixDialogPortal>
        <DialogOverlay contentPosition="center">
          <DialogContent
            position="center"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>Edit visit</DialogHeader>

            <div className="grid flex-grow grid-cols-[464px,1fr]">
              <Calendar
                aria-label="Date"
                calendarStateProps={{
                  defaultValue: parseDate(dayOfVisit.format('YYYY-MM-DD')),
                  isDateUnavailable: (date) => {
                    const curDate = dayjs(date.toString())

                    return (
                      curDate.isAfter(
                        dayOfVisit.add(visitWindow.window_after_days, 'day')
                      ) ||
                      curDate.isBefore(
                        dayOfVisit.subtract(
                          visitWindow.window_before_days,
                          'day'
                        )
                      )
                    )
                  },
                }}
                className="p-6"
              />
              <div className="border-l border-neutral-200 p-4">a</div>
            </div>

            <DialogFooter
              buttonSlotSecondary={
                <RadixDialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </RadixDialogClose>
              }
              buttonSlotPrimary={
                <Button type="submit" variant="primary">
                  Confirm
                </Button>
              }
            />
          </DialogContent>
        </DialogOverlay>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}

export default EditVisitDialog
