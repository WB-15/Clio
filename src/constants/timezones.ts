export const TIMEZONES = [
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Perth',
  'Australia/Brisbane',
  'Australia/Adelaide',
  'Australia/Darwin',
  'Australia/Hobart',
  'Australia/Currie',
  'Australia/Eucla',
  'Australia/Lord_Howe',
  'Australia/Lindeman',
  'Australia/Broken_Hill',
  'Pacific/Auckland',
]

export const TIMEZONE_SELECT = TIMEZONES.map((timezone) => ({
  label: timezone,
  value: timezone,
}))
