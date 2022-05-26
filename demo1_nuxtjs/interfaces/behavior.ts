import { IParams, IFilter } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'
import { IUser } from '@/interfaces/user'
import { IBehaviorGroup } from '@/interfaces/behaviorGroup'

export type IBehaviorType = 1 | 2
export type IBehaviorApplyFor = 1 | 2

export interface IFilterBehavior extends IFilter {
  type: IBehaviorType[]
  user_id: number[]
  branch_id: number[]
  behavior_group_id: number[]
  time_from: string
  time_to: string
}

export type IParamsBehavior = IParams<IFilterBehavior>

export interface IApplyForUser {
  hours: number
  money: number
  points: number
}

export interface IApplyForBranch {
  points: number
}

export interface IBehavior {
  id: number
  name: string
  code: string
  description: string
  type: IBehaviorType
  behavior_group_id: number
  behavior_group: IBehaviorGroup
  apply_for: IBehaviorApplyFor
  level: number
  apply_value: {
    user: IApplyForUser
    branch: IApplyForBranch
  }
  status: IStatusValue
  created_by_id: number
  created_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IBehaviorForm {
  id?: number
  name: string
  type: IBehaviorType
  behavior_group_id: number | undefined
  apply_for: IBehaviorApplyFor
  level: number
  description: string
  status: IStatusValue
  apply_value: {
    user: IApplyForUser
    branch: IApplyForBranch
  }
}
