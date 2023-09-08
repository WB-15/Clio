import { Time } from '@internationalized/date'

export const hoursToMinutes = (time: Time) => {
  const minutes = Math.floor(time.hour * 60)
  const totalMinutes = minutes + time.minute
  return totalMinutes
}
