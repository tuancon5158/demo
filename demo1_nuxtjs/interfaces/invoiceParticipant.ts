import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { IRole } from '@/interfaces/policy'
import { IStatusValue } from '@/interfaces/status'

export interface IFilter {
  user_id: number[]
  branch_id: number[]
  role: IRole[]
  status: number[]
  time_from: string
  time_to: string
}

export type IParamsInvoiceParticipant = IParams<IFilter>

export interface IInvoiceParticipant {
  id: number
  model_id: number
  model_name: string
  model_code: string
  model_status: number
  role: IRole
  note: string
  user_id: number
  user: IUser
  value: string | null
  status: IStatusValue
  docs: string[] | null
  created_at: string
  updated_at: string
}

export interface IInvoiceParticipantForm {
  id?: number
  model_id: number
  model_name: string
  model_code: string
  model_status: number
  user_id: number
  role: IRole
  note: string
  value: string | null
  docs: string[]
  status: IStatusValue
  created_at: string
}
