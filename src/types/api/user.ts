interface IMetadata {}

export interface IUser {
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  active: boolean
  metadata: IMetadata
  created: string
  modified: string
}
