export interface ISiteConfiguration {
  name: string
  address: string
  contact_number: string
  contact_email: string
  default_patient_reminder_hours: number
  availability: ISiteAvailability
}

export interface ISiteAvailability {
  timezone: string
  hours: IHours
}

export interface IHours {
  sunday: IDayAvailability | null
  monday: IDayAvailability | null
  tuesday: IDayAvailability | null
  wednesday: IDayAvailability | null
  thursday: IDayAvailability | null
  friday: IDayAvailability | null
  saturday: IDayAvailability | null
}

export interface IDayAvailability {
  start: IStartAvailability
  end: IEndAvailability
}

export interface IStartAvailability {
  hour: number
  minute: number
}

export interface IEndAvailability {
  hour: number
  minute: number
}
