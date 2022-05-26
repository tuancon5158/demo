import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { IShift } from '@/interfaces/timesheet'
import { IHoliday } from '@/interfaces/holiday'

export interface IFilter {
  user_id: number[]
  branch_id: number[]
  area_id: number[]
  block_type_id: number[]
  time_from: string
  time_to: string
}

export interface IParamsDateBlock extends IParams<IFilter> {
  view_mode: 'company' | 'personal'
}

export interface IDateBlock {
  id: number
  user: IUser
  user_id: number
  date: string
  time_blocks: ITimeBlock[]
  is_super_sunday: boolean
  holiday: IHoliday
}

export interface IDateBlockForm {
  id?: number
  user_id: number
  date: string
  time_blocks: Array<{
    period: IShift
    block_type_id: number
    wage_weight: number
  }>
}
