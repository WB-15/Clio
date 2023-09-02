import { Time } from '@internationalized/date'
import { z } from 'zod'

import { IDayAvailability, ISiteConfiguration } from '@/types/api'
import { NOTIFICATION_LIST, TIMEZONE_SELECT } from '@/constants'
import { siteDetailsSchema } from '@/utils/zod'

type FormDataType = z.input<typeof siteDetailsSchema>

const formatFormTime = (workingTime: IDayAvailability | null) => ({
  isWorking: !!workingTime,
  start: new Time(workingTime?.start?.hour, workingTime?.start?.minute),
  end: new Time(workingTime?.end?.hour, workingTime?.end?.minute),
})

export const formatSiteConfigurationFormData = (
  data: ISiteConfiguration
): FormDataType => {
  const { availability } = data
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
    availability.hours

  return {
    name: data?.name,
    address: data?.address,
    contact_number: data?.contact_number,
    contact_email: data?.contact_email,
    default_patient_reminder_hours:
      NOTIFICATION_LIST.find(
        ({ value }) => data.default_patient_reminder_hours === value
      ) || NOTIFICATION_LIST[0],
    availability: {
      timezone:
        TIMEZONE_SELECT.find(({ value }) => value === availability.timezone) ||
        TIMEZONE_SELECT[0],
      sunday: formatFormTime(sunday),
      monday: formatFormTime(monday),
      tuesday: formatFormTime(tuesday),
      wednesday: formatFormTime(wednesday),
      thursday: formatFormTime(thursday),
      friday: formatFormTime(friday),
      saturday: formatFormTime(saturday),
    },
  }
}
