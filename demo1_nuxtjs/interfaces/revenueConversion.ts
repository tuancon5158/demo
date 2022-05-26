import { IParams, IFilter } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'
import { IUser } from '@/interfaces/user'

export interface IFilterRevenueConversion extends IFilter {}

export type IParamsRevenueConversion = IParams<IFilterRevenueConversion>

export interface IRevenueConversion {
  id: number
  name: string
  description: string
  product_group_id: number
  product_group: null
  status: IStatusValue
  conversion_weight: number
  created_by_id: number
  created_by_user: IUser
  last_updated_by_id: string | null
  last_updated_by_user: string | null
  created_at: string
  updated_at: string
}

export interface IRevenueConversionForm {
  id?: number
  name: string
  description: string
  product_group_id: number | null
  conversion_weight: number
  status: IStatusValue
}
