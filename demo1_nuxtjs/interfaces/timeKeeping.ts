import { IUser } from '@/interfaces/user'
import { IDepartment } from '@/interfaces/department'
import { IBehavior } from '@/interfaces/behavior'

export type ITimeKeepingStatus = 'APPROVED' | 'PENDING' | 'REJECTED'
export type ITimeKeepingType = 'CHECKIN' | 'CHECKOUT' | 'REJECTED'

export interface ITimeKeepingParams {
  per_page: number
  cur_page: number
  search: string
  filter: {
    time_from: string
    time_to: string
    status: ITimeKeepingStatus | string
    type: ITimeKeepingType | string
  }
}

export interface ITimeKeepingTimeBlock {
  start_time: string
  end_time: string
}

export interface ITimeKeeping {
  id: number
  type: ITimeKeepingType
  status: ITimeKeepingStatus
  real_date: string
  real_time: string
  image_path: string
  time_diff: number
  note: string
  time_block: ITimeKeepingTimeBlock
  behavior: IBehavior
  user: IUser
  department: IDepartment
  method: string
  setting_type: string
  standard_time: string
}

export type ITimeKeepingSettingType = 'FIXED' | 'FLEXIBLE' | 'NO_TIMEKEEPING'

export interface ITimeKeepingSetting {
  id: number
  type: ITimeKeepingSettingType
  name: string
  meta_data: number[]
}

export interface ITimeKeepingBehavior {
  id: number
  code: string
  name: string
}
