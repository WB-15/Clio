import { ComponentProps, FC } from 'react'
import { useCalendar, useLocale } from 'react-aria'
import { CalendarStateOptions, useCalendarState } from 'react-stately'
import {
  CalendarDate,
  createCalendar,
  DateValue,
} from '@internationalized/date'

import { Icon } from '@/app/components'

import CalendarGrid from './components/CalendarGrid'
import ReactAriaButton from './components/ReactAriaButton'

interface CalendarProps extends ComponentProps<'div'> {
  calendarStateProps?: Omit<
    CalendarStateOptions<CalendarDate>,
    'locale' | 'createCalendar'
  >
  isDateOutsideVisitWindow: (date: DateValue) => boolean
  isDateInVisitWindowBuffer: (date: DateValue) => boolean
  className?: string
}

export const Calendar: FC<CalendarProps> = (props) => {
  const {
    calendarStateProps,
    className,
    isDateOutsideVisitWindow,
    isDateInVisitWindowBuffer,
  } = props
  const { locale } = useLocale()

  const calendarState = {
    ...calendarStateProps,
    locale,
    createCalendar,
  }

  const state = useCalendarState({
    ...calendarState,
  })

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(calendarState, state)

  const [month, year] = title.split(' ')

  return (
    <div {...calendarProps} className={className}>
      <div className="grid grid-cols-[1fr,auto,auto] items-center gap-x-2">
        <h2 className="flex gap-x-2 text-lg font-bold">
          <span>{month}</span>
          <span className="text-neutral-400">{year}</span>
        </h2>
        <ReactAriaButton {...prevButtonProps}>
          <Icon name="icon-chevron_down" size={22} className="rotate-90" />
        </ReactAriaButton>
        <ReactAriaButton {...nextButtonProps}>
          <Icon name="icon-chevron_down" size={22} className="-rotate-90" />
        </ReactAriaButton>
      </div>
      <CalendarGrid
        state={state}
        weekdayStyle="short"
        isDateOutsideVisitWindow={isDateOutsideVisitWindow}
        isDateInVisitWindowBuffer={isDateInVisitWindowBuffer}
      />
    </div>
  )
}
