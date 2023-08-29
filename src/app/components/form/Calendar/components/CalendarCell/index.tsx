/* eslint-disable no-nested-ternary */

import { FC, useRef } from 'react'
import { AriaCalendarCellProps, useCalendarCell } from 'react-aria'
import { CalendarState, RangeCalendarState } from 'react-stately'
import clsx from 'clsx'
import { DateValue } from '@internationalized/date'

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState
  isDateOutsideVisitWindow: (date: DateValue) => boolean
  isDateInVisitWindowBuffer: (date: DateValue) => boolean
}

const CalendarCell: FC<CalendarCellProps> = (props) => {
  const {
    state,
    date,
    isDateInVisitWindowBuffer,
    isDateOutsideVisitWindow,
    ...rest
  } = props
  const ref = useRef(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date, ...rest }, state, ref)

  const isInVisitWindowBuffer = isDateInVisitWindowBuffer(date)
  const isOutsideVisitWindow = isDateOutsideVisitWindow(date)

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        data-disabled={isDisabled}
        className={clsx(
          'grid h-14 w-14 place-items-center rounded-lg duration-300 ease-in-out data-disabled:hidden',
          isOutsideVisitWindow
            ? 'text-neutral-300'
            : isInVisitWindowBuffer
            ? isSelected
              ? 'bg-primary-500 text-white'
              : 'bg-primary-200 text-white hocus:bg-primary-500'
            : isSelected
            ? 'bg-orange-500 text-white'
            : 'bg-neutral-100 hocus:bg-neutral-200'
        )}
      >
        {formattedDate}
      </div>
    </td>
  )
}

export default CalendarCell
