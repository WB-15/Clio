interface IMetadata {}

export interface IUser {
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  active: boolean
  metadata: IMetadata
  created: Date | null
  modified: Date | null
  is_site_user: boolean
  is_patient: boolean
  is_cra: boolean
}

export interface IUserWithToken {
  token: string
  user: IUser
}
