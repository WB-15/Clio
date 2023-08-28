import { ComponentProps, FC } from 'react'
import { AriaCalendarProps, useCalendar, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import {
  CalendarDate,
  CalendarDateTime,
  createCalendar,
  ZonedDateTime,
} from '@internationalized/date'

import { Icon } from '@/app/components'

import CalendarGrid from './components/CalendarGrid'
import ReactAriaButton from './components/ReactAriaButton'

interface CalendarProps extends ComponentProps<'div'> {
  calendarStateProps?: AriaCalendarProps<
    CalendarDate | CalendarDateTime | ZonedDateTime
  >
  className?: string
}

const Calendar: FC<CalendarProps> = (props) => {
  const { calendarStateProps, className } = props
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
      <CalendarGrid state={state} weekdayStyle="short" />
    </div>
  )
}

export default Calendar
