/* eslint-disable no-nested-ternary */

import { FC, useRef } from 'react'
import { AriaCalendarCellProps, useCalendarCell } from 'react-aria'
import { CalendarState, RangeCalendarState } from 'react-stately'
import clsx from 'clsx'

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState
}

const CalendarCell: FC<CalendarCellProps> = (props) => {
  const { state, ...rest } = props
  const ref = useRef(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ ...rest }, state, ref)

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clsx(
          'grid h-14 w-14 place-items-center rounded-lg duration-300 ease-in-out',
          isDisabled
            ? 'text-neutral-300'
            : isUnavailable
            ? 'bg-neutral-100 hocus:bg-neutral-200'
            : isSelected
            ? 'bg-primary-500 text-white'
            : 'bg-primary-200 text-white hocus:bg-primary-500'
        )}
      >
        {formattedDate}
      </div>
    </td>
  )
}

export default CalendarCell
