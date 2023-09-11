import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import dayjs from 'dayjs'

export const addWeekdays = (startDate: CalendarDate, numDays: number) => {
  let currentDate = dayjs(startDate.toDate(getLocalTimeZone()))
  let remainingDays = numDays

  while (remainingDays > 0) {
    currentDate = currentDate.add(1, 'day')

    if (currentDate.day() >= 1 && currentDate.day() <= 5) {
      remainingDays -= 1
    }
  }

  const calendarDate = new CalendarDate(
    currentDate.year(),
    currentDate.month() + 1,
    currentDate.date()
  )

  return calendarDate
}
