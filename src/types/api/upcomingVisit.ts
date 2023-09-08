export interface IUpcomingBase {
  name: string
  trial_name: string
  trial_id: string
  visit_datetime: string
  visit_window_name: string
  patient_number: string
  patient_first_name: string
  patient_last_name: string
  patient_id: string
  duration_minutes: number
  visit_type: string
  visit_id: string
  fasting: boolean
  status: VisitStatus
}

export interface IUpcomingVisit extends IUpcomingBase {}

export enum VisitStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  MISSED = 'missed',
  COMPLETED = 'completed',
}
