import { IFilter, IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { IBranch } from '@/interfaces/branch'

export interface IRewardsPunishmentFilter extends IFilter {
  type: number[]
  user_id: number[]
  branch_id: number[]
  behavior_group_id: number[]
  time_from: string
  time_to: string
}

export type IParamsRewardsPunishment = IParams<IRewardsPunishmentFilter>

export interface IRewardsPunishment {
  id: number
  user_id: number
  user: IUser
  branch: IBranch
  time_blocks: ITimeBlock[]
  reason: string
  images: string[]
  location: string
  approved_by_id: number | null
  approved_by_user: IUser | null
  approved_at: string | null
  status: -1 | 0 | 1
  note: null
  created_by_id: 1
  created_by_user: IUser
  last_updated_by_id: number | null
  last_updated_by_user: IUser | null
  created_at: string
  updated_at: string
}

export interface IRewardsPunishmentForm {
  id?: number
  user_id: number | undefined
  branch_id: number | undefined
  behavior_id: number | undefined
  apply_date: string
  description: string
  apply_value: {
    user: {
      hours: number
      money: number
      points: number
    }
    branch: {
      points: number
    }
  }
  docs: string[]
  images: string[]
}
