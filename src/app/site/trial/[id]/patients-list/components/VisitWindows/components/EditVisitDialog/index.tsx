import React, { FC, useMemo, useState } from 'react'
import {
  getLocalTimeZone,
  today,
  getDayOfWeek,
  Time,
} from '@internationalized/date'
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
import { formattedNumber, hoursToMinutes } from '@/utils'

interface EditVisitDialogProps {
  visitWindow: IVisitWindow
  onConfirm: (value: IVisitWindow) => void
}

const EditVisitDialog: FC<EditVisitDialogProps> = (props) => {
  const { visitWindow, onConfirm } = props
  const visitEndTime = dayjs(visitWindow.visit_datetime).add(
    visitWindow.duration_minutes,
    'minutes'
  )
  const startTimeProps = new Time(
    parseInt(dayjs(visitWindow.visit_datetime).format('HH'), 10),
    parseInt(dayjs(visitWindow.visit_datetime).format('mm'), 10)
  )
  const [startTime, setStartTime] = useState<Time>(startTimeProps)
  const [endTime, setEndTime] = useState<Time>(
    new Time(
      parseInt(visitEndTime.format('HH'), 10),
      parseInt(visitEndTime.format('mm'), 10)
    )
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const handleConfirm = () => {
    const updatedMinutes = hoursToMinutes(startTime)

    const newVisitDatetime = dayjs(calendarDate.toString()).add(
      updatedMinutes,
      'minute'
    )

    const newVisitWindow = {
      ...visitWindow,
      visit_datetime: newVisitDatetime,
    }
    onConfirm(newVisitWindow)
    setIsDialogOpen(false)
  }

  const handleStartTimeChange = (value: Time) => {
    setStartTime(value)
    setEndTime(value.add({ minutes: visitWindow.duration_minutes }))
  }

  const isSelectedInside = useMemo(
    () =>
      calendarDate.compare(visitWindowBufferStartDate) >= 0 &&
      calendarDate.compare(visitWindowBufferEndDate) <= 0,
    [calendarDate, visitWindowBufferEndDate, visitWindowBufferStartDate]
  )

  return (
    <RadixDialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <div className="flex gap-5 px-5 py-2">
              <div className="flex items-center gap-1.5">
                <Icon name="icon-trials" size={20} />
                <span className="text-[14px] font-medium text-black">
                  {visitWindow.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="icon-clock" size={20} />
                <span className="text-[14px] font-medium text-black">
                  {`${formattedNumber(visitWindow.duration_minutes / 60)}h`}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {visitWindow.visit_type === 'remote' ? (
                  <Icon name="icon-phone" size={20} />
                ) : (
                  <Icon name="icon-building" size={20} />
                )}
                <span className="text-[14px] font-medium capitalize text-black">
                  {visitWindow.visit_type}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="icon-no-food" size={20} />
                <span className="text-[14px] font-medium text-black">
                  Fasting
                </span>
              </div>
            </div>
            <div className="grid flex-grow grid-cols-[464px,1fr]">
              <Calendar
                aria-label="Date"
                calendarStateProps={{
                  value: calendarDate,
                  onChange: setCalendarDate,
                }}
                isDateOutsideVisitWindow={(date) =>
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
                    value={startTime}
                    onChange={(value) => handleStartTimeChange(value as Time)}
                  />
                  <span className="text-sm leading-9 text-neutral-400">-</span>
                  <TimeField
                    label="Time"
                    hourCycle={24}
                    inputSlotLeft="To:"
                    hideLabel
                    isDisabled
                    value={endTime}
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
                <Button type="submit" variant="primary" onClick={handleConfirm}>
                  Confirm
                </Button>
              }
              leftFooterContent={
                !isSelectedInside && (
                  <div className="flex items-center gap-3">
                    <Icon name="icon-error" size={32} color="#F48621" />
                    <h4 className="text-sm font-semibold text-black">
                      Your chosen date is out of window. <br />
                      You can still try to reschedule to this day.
                    </h4>
                  </div>
                )
              }
            />
          </DialogContent>
        </DialogOverlay>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}

export default EditVisitDialog
