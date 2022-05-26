import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { IStatusValue } from '@/interfaces/status'

export interface IFilter {
  fromWeight: number | string
  toWeight: number | string
  status: number[]
  time_from?: ''
  time_to?: ''
}

export type IParamsWageWeight = IParams<IFilter>

export interface IWageWeight {
  id: number
  name: string
  fields: string
  weight: number | string
  status: IStatusValue
  note: string
  created_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IWageWeightForm {
  id?: number
  name: string
  fields: string
  weight: number | string
  status: IStatusValue
  note: string
}
