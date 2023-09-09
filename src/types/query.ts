export type FetchApiOptions = {
  options?: RequestInit
  body?: Record<string, any>
  urlSearchParams?: Record<string, any>
  method?: RequestInit['method']
  authToken?: string
  cache?: string
}
