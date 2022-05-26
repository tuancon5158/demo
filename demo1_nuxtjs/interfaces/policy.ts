import { APPLY_FOR_ACCOUNT, APPLY_FOR_TYPE, POLICY_TYPE } from '@/state'
import { IParams } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'

export interface IFilterPolicy {
  type: number[]
  created_by_id: number[]
  apply_for_account: number[]
  status: number[]
  time_from: string
  time_to: string
}

export type IParamsPolicy = IParams<IFilterPolicy>

export interface ITitle {
  id: number
  points: number // điểm
  percents?: number // phần trăm
  dongs?: number // tiền
}

export type IRole =
  | 'TECHNIQUE'
  | 'TECHNIQUE_HARDWARE'
  | 'PACKAGING'
  | 'SHIPPING'
  | 'GUARANTEE_RETURN'
  | 'GUARANTEE_ACCEPT'
  | 'REPAIR_RETURN'
  | 'REPAIR_ACCEPT'
  | 'RECEIVING'

export interface IPolicy {
  id?: number
  name: string
  type: POLICY_TYPE
  time_check: 0 | 1
  from_date: string
  to_date: string
  apply_for_account: APPLY_FOR_ACCOUNT
  apply_for: APPLY_FOR_TYPE
  role: IRole | ''
  model_names: string[]
  product_group_ids: number[]
  titles: ITitle[]
  status: IStatusValue
  note: string
  created_at: string
  updated_at: string
}

export interface IPolicyForm {
  id?: number
  name: string
  type: POLICY_TYPE
  time_check: boolean
  from_date: string
  to_date: string
  apply_for_account: APPLY_FOR_ACCOUNT
  apply_for: APPLY_FOR_TYPE
  role: IRole | ''
  product_group_ids: number[]
  model_names: string[]
  titles: ITitle[]
  status: IStatusValue
  note: string
}

export interface IResponseInvoiceRole {
  roles: Array<{ name: string; code: string }>
  invoices: Array<{ name: string; code: string }>
}
