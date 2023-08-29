import React, { FC, useState } from 'react'
import { getLocalTimeZone, today, getDayOfWeek } from '@internationalized/date'
import dayjs from 'dayjs'

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
import { IVisitWindow } from '@/types/api'
import { Calendar, TimeField } from '@/app/components/form'

interface EditVisitDialogProps {
  visitWindow: IVisitWindow
  prevVisitWindow?: IVisitWindow
  nextVisitWindow?: IVisitWindow
}

const EditVisitDialog: FC<EditVisitDialogProps> = (props) => {
  const { visitWindow, prevVisitWindow, nextVisitWindow } = props

  const todayDate = today(getLocalTimeZone())

  const dateOfVisit = todayDate.add({
    days: visitWindow.visit_day,
  })

  const [calendarDate, setCalendarDate] = useState(dateOfVisit)

  const visitWindowBufferStartDate = dateOfVisit.subtract({
    days: visitWindow.window_before_days,
  })
  const visitWindowBufferEndDate = dateOfVisit.add({
    days: visitWindow.window_after_days,
  })

  const minDate = prevVisitWindow
    ? todayDate.add({
        days: prevVisitWindow.visit_day + prevVisitWindow.window_after_days,
      })
    : todayDate

  const maxDate = nextVisitWindow
    ? todayDate.add({
        days: nextVisitWindow.visit_day - nextVisitWindow.window_before_days,
      })
    : visitWindowBufferEndDate.add({ days: visitWindow.window_after_days })

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
            classNameInner="min-h-[662px]"
          >
            <DialogHeader>Edit visit</DialogHeader>

            <div className="grid flex-grow grid-cols-[464px,1fr]">
              <Calendar
                aria-label="Date"
                calendarStateProps={{
                  value: calendarDate,
                  onChange: setCalendarDate,
                }}
                isDateOutsideVisitWindow={(date) =>
                  date.compare(minDate) <= 0 ||
                  date.compare(maxDate) >= 0 ||
                  getDayOfWeek(date, 'en-US') === 0 ||
                  getDayOfWeek(date, 'en-US') === 6
                }
                isDateInVisitWindowBuffer={(date) =>
                  date.compare(visitWindowBufferStartDate) >= 0 &&
                  date.compare(visitWindowBufferEndDate) <= 0
                }
                className="border-r border-neutral-200 p-6"
              />
              <div className="grid content-start gap-y-6 p-4">
                <h2 className="text-lg font-bold">
                  {dayjs(calendarDate.toString()).format('dddd, DD')}
                </h2>
                <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-x-3">
                  <TimeField
                    label="Time"
                    hourCycle={24}
                    inputSlotLeft="From:"
                  />
                  <span className="text-sm leading-9 text-neutral-400">-</span>
                  <TimeField
                    label="Time"
                    hourCycle={24}
                    inputSlotLeft="To:"
                    hideLabel
                  />
                </div>
              </div>
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
