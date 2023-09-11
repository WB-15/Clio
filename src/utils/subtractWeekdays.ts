import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import dayjs from 'dayjs'

export const subtractWeekdays = (startDate: CalendarDate, numDays: number) => {
  let currentDate = dayjs(startDate.toDate(getLocalTimeZone()))
  let remainingDays = numDays

  while (remainingDays > 0) {
    currentDate = currentDate.subtract(1, 'day')

    if (currentDate.day() !== 0 && currentDate.day() !== 6) {
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
