import { IParams } from '@/interfaces/resource'
import { IShift } from '@/interfaces/timesheet'
import { IUser } from '@/interfaces/user'

export interface IFilter {
  user_id: number[]
  dept_id: number[]
  status: number[]
  time_from?: string
  time_to?: string
}

export type IParamsTimeBlock = IParams<IFilter>

export interface IBlockType {
  bg_color: string | null
  color: string
  description: string
  id: number
  name: string
  wage_weight?: number
}

export interface IDateBlock {
  id: number
  user: IUser
  user_id: number
  date: string
}

export interface ITimeBlock {
  block_type: IBlockType
  block_type_id: number | string
  date_block_id: number
  date_block: IDateBlock
  id: number
  period: IShift
  wage_weight: number
}

export interface ITimeBlockForm {
  user_id?: number
  date: string
  period: [number, number]
  reason: string
  images: string[]
}
