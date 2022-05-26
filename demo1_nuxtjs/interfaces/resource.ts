export interface IFilter {
  status: number[]
  time_from?: string
  time_to?: string
}

export interface IParams<F> {
  search: string
  per_page: number
  cur_page: number
  filter: F
  sort?: any
}

export interface ILinks {
  first: string
  last: string
  prev: string
  next: string
}

export interface IMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  total_work_hour: number
  total_additional_amount?: number
  total_approved_amount?: number
  from?: string
  to?: string
  path: string
}

export interface IResponse<T> {
  data: T
  links: Partial<ILinks>
  meta: IMeta
}
export interface IResponseNew<T> {
  success: boolean
  message?: string
  data?: T
  error?: {
    code: string
    message: string
    errors: []
  }
}
export interface IMetaData {
  current_page: number
  from: number
  last_page: number
  next_page_url: string | null
  per_page: number
  prev_page_url: number | null
  to: number
  total: number
}
export interface IResponseV2<T> {
  data: T
  success: boolean
}
