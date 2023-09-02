import { z } from 'zod'

import { hoursSchema, siteDetailsSchema } from '@/utils/zod'
import { ISiteConfiguration } from '@/types/api'

type FormDataType = z.input<typeof siteDetailsSchema>
type FormHoursType = z.input<typeof hoursSchema>

const formatPatchWorkingTime = (workingTime: FormHoursType) =>
  workingTime?.isWorking
    ? {
        start: {
          hour: workingTime.start?.hour,
          minute: workingTime.start?.minute,
        },
        end: { hour: workingTime.end?.hour, minute: workingTime.end?.minute },
      }
    : null

export const formatSiteConfigurationPatchData = (
  data: FormDataType
): ISiteConfiguration => {
  const {
    timezone,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  } = data.availability || {}

  return {
    ...data,
    default_patient_reminder_hours: parseFloat(
      data.default_patient_reminder_hours?.value
    ),
    availability: {
      timezone: timezone?.value,
      hours: {
        sunday: formatPatchWorkingTime(sunday),
        monday: formatPatchWorkingTime(monday),
        tuesday: formatPatchWorkingTime(tuesday),
        wednesday: formatPatchWorkingTime(wednesday),
        thursday: formatPatchWorkingTime(thursday),
        friday: formatPatchWorkingTime(friday),
        saturday: formatPatchWorkingTime(saturday),
      },
    },
  }
}
