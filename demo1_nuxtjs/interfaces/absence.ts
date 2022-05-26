import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { IArea } from '@/interfaces/area'
import { IDepartment } from '@/interfaces/department'

export interface IFilter {
  user_id: number[]
  dept_id: number[]
  branch_id: number[]
  area_id: number[]
  status: number[]
  type: number[]
  is_my_personnel: boolean
  time_from: string
  time_to: string
}

export type IParamsAbsence = IParams<Partial<IFilter>>

export interface IAbsence {
  id: number
  user_id: number
  user: IUser
  time_blocks: ITimeBlock[]
  reason: string
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

export interface IAbsenceForm {
  id?: number
  user_id: number
  time_blocks: number[]
  reason: string
  startDate: string
  endDate: string
  status?: -1 | 0 | 1
}
