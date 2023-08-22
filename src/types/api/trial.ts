export interface ITrialBase {
  trial_id: string
  name: string
  site_id: string
  contact_name: string
  contact_number: string
  contact_user_id: string | null
  created: string
  modified: string
}

export interface ITrial extends ITrialBase {
  patient_count: number
}

export interface ITrialWithPatients extends ITrialBase {
  patients: IPatient[]
}

export interface IPatient {
  patient_id: string
  patient_number: string
  user_id: string
  trial_id: string
  created: string
  modified: string
  screening_visit: string
  status: string
  first_name: string
  last_name: string
  email: any
  phone: string
  next_visit_date: string
}
