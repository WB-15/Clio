import dayjs from 'dayjs'

export interface IVisitWindow {
  visit_window_id: string
  name: string
  trial_id: string
  visit_day: number
  window_before_days: number
  window_after_days: number
  duration_minutes: number
  visit_type: string
  fasting: boolean
  created: string
  modified: string
  visit_datetime: dayjs.Dayjs
}
