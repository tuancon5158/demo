import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { IStatusValue } from '@/interfaces/status'
import { ITimesheet } from '@/interfaces/timesheet'

export interface IFilter {
  time_sheet_id: number[]
  created_by_id: number[]
  from_weight: number | ''
  to_weight: number | ''
  time_from: string
  time_to: string
  status: number[]
}

export type IParamsHoliday = IParams<IFilter>

export interface IHoliday {
  id: number
  name: string
  description: string
  from_date: string
  to_date: string
  time_sheets: ITimesheet[]
  files: string[]
  wage_weight: number
  color: string
  apply_for_flex_time_sheet: 0 | 1
  status: IStatusValue
  note: string
  created_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IHolidayForm {
  id?: number
  name: string
  description: string
  from_date: string
  to_date: string
  time_sheets: number[]
  files: string[]
  wage_weight: number | ''
  color: string
  apply_for_flex_time_sheet: boolean
  status: IStatusValue
}
