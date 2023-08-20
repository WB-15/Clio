export interface ITrialBase {
  trial_id: string
  name: string
  site_id: string
  contact_name: string
  contact_number: string
  contact_user_id: string | null
  created: string
  modified: Date
}

export interface ITrial extends ITrialBase {
  patient_count: number
}
