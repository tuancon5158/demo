import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { IShift } from '@/interfaces/timesheet'
import { IServiceStatus } from '@/interfaces/serviceStatus'
import { ITimeBlock } from '@/interfaces/timeBlock'

export type MODEL_NAME = 'OT' | 'ABSENT' | 'OUTSIDE'

export interface IFilter {
  status: number[]
  model_name: MODEL_NAME | undefined | ''
  time_from: string
  time_to: string
  user_id: number[]
}

export type IParamsChangingTime = Omit<IParams<IFilter>, 'search'>

interface IChangingTimeBase {
  id: number
  model_name: MODEL_NAME
  user_id: number
  user: IUser
  totalTime: number
  date: string
  reason: string
  images: string[]
  approved_by_id: number
  approved_by_user: IUser
  approved_at: string
  status: IServiceStatus
  note: string | null
  created_by_id: number
  created_by_user: IUser
  last_updated_by_id: string | null
  last_updated_by_user: string | null
  created_at: string
  updated_at: string
}

export interface IChangingTimeWithPeriod extends IChangingTimeBase {
  model_name: 'OT'
  period: IShift
}

export interface IChangingTimeWithTimeBlock extends IChangingTimeBase {
  model_name: 'ABSENT' | 'OUTSIDE'
  time_blocks: ITimeBlock[]
}

export type IChangingTime = IChangingTimeWithPeriod | IChangingTimeWithTimeBlock
