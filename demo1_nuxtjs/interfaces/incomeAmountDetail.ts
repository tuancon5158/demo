import { IUser } from '@/interfaces/user'

export type IAccount = 1 | 2 | 3

export interface IFilter {
  user_id: number
  account: IAccount
  month: number
  quarter?: number
  year: number
}

export type IParamsIncomeAmountDetail = {
  filter: IFilter
}

export interface IAmount {
  id?: number
  user_id?: number
  user?: IUser
  account?: IAccount
  month?: number
  quarter?: number | null
  year?: number
  approved_amount?: number
  calculated_amount?: number
  created_at?: string
  updated_at?: string
}

export interface IAmountType {
  id: number
  name: string
  code: string
  type: number
  calculate_type: 'ADD' | 'SUB'
  created_at: string
  updated_at: string
}

export interface IUpdatedChild {
  additional_amount: number
  amount_id: number
  approved_amount: number
  id: number
  note: string
  status: number
  updated_at: string
}

export interface IUpdatedItem {
  new: IUpdatedChild
  old: IUpdatedChild
  updated_by_user: IUser
  updated_reasons: string | null
}

// new one
export interface IIncomeAmountDetail {
  id: number
  amount_id: number
  amount: IAmount
  type_id: number
  type: IAmountType
  approved_amount: number | null
  calculated_amount: number
  additional_amount: number
  policy_id: number | null
  policy_details: { id: number; name: string } | null
  created_at: string
  updated_at: string
  latest_update: IUpdatedItem
  updates: IUpdatedItem[]
  additional_amount_same_format?: number
  approved_amount_same_format?: number
  [index: string]: any
}
export interface ITypeIncome {
  id: number
  code: string
  name: string
  calculate_type: string
}
export interface IIncomeAmountNew {
  id: number
  name: string
  duration: number
  month: number
  quarter: number
  year: number
  approved_amount: number | null
  additional_amount: number
  stage: string
  status: string
  note: string | null
  attached_files: [] | null
  created_at: string
  updated_at: string
  user_id: number
  user: IUser
  type_id: number
  type: ITypeIncome
  [index: string]: any
}

export interface IMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  total_work_hour: number
  total_additional_amount: number
  total_approved_amount: number
  from?: string
  to?: string
  path: string
}

export interface IIncomeAmountDataResponse {
  amounts: IIncomeAmountNew[]
  meta_data: IMeta
}

export interface IIncomeAmountResponse {
  success: boolean
  message: string
  data: IIncomeAmountDataResponse
}
