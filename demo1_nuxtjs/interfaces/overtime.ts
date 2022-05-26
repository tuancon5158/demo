import { IParams } from '@/interfaces/resource'
import { IShift } from '@/interfaces/timesheet'
import { IUser } from '@/interfaces/user'
import { IDepartment } from '@/interfaces/department'
import { IArea } from '@/interfaces/area'

export interface IFilter {
  user_id: number[]
  dept_id: number[]
  area_id: number[]
  status: number[]
  is_my_personnel: false
  time_from: string
  time_to: string
}

export type IParamsOvertime = IParams<Partial<IFilter>>

export interface IOvertime {
  id: number
  user_id: number
  user: IUser
  date: string
  period: IShift
  reason: string
  images: string[]
  approved_by_id: number | null
  approved_by_user: IUser | null
  approved_at: string | null
  status: -1 | 0 | 1
  note: null
  created_by_id: 1
  created_by_user: IUser
  last_updated_by_id: number | null
  last_updated_by_user: IUser | null
  area: IArea
  department: IDepartment
  created_at: string
  updated_at: string
}

export interface IOvertimeForm {
  id?: number
  user_id?: number
  date: string
  period: IShift
  reason: string
  images: string[]
  user?: IUser | null
  status?: -1 | 0 | 1
}
