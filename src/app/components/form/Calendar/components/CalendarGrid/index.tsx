/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { FC } from 'react'
import { AriaCalendarGridProps, useCalendarGrid, useLocale } from 'react-aria'
import { getWeeksInMonth } from '@internationalized/date'
import { CalendarState } from 'react-stately'

import CalendarCell from '../CalendarCell'

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState
}

const CalendarGrid: FC<CalendarGridProps> = (props) => {
  const { state, ...rest } = props
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(rest, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table
      {...gridProps}
      className="-ml-0.5 mt-6 border-separate border-spacing-0.5"
    >
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>
              <div className="grid w-14 place-items-center py-2.5 text-sm font-medium uppercase leading-3.5">
                {day}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CalendarGrid
