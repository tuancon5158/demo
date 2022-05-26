import { APPLY_FOR_ACCOUNT, APPLY_FOR_TYPE, POLICY_TYPE } from '@/state'
import { IParams } from '@/interfaces/resource'
import { IUser } from '@/interfaces/user'
import { IStatusValue } from '@/interfaces/status'
import { IRole } from '@/interfaces/policy'

export interface IFilter {
  perf_policy_id: number[]
  user_id: number[]
  branch_id: number[]
  dept_id: number[]
  status: number[]
  time_from: string
  time_to: string
}

export type IParamsPerformance = IParams<IFilter>

export interface IPerformancePolicy {
  id: 1
  name: string
  time_check: number
  from_date: string
  to_date: string
  type: POLICY_TYPE
  apply_for: APPLY_FOR_TYPE
  apply_for_account: APPLY_FOR_ACCOUNT
  role: IRole
  model_names: string[]
  status: IStatusValue
  created_by_id: number
  created_by_user: IUser
  last_updated_by_id: number
  last_updated_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IPerformance {
  id: number
  user_id: number
  user: IUser
  perf_policy_id: number
  perf_policy: IPerformancePolicy
  description: string
  model_name: string
  model_id: number
  model_code: string
  model_status: number
  money: number
  points: number
  status: IStatusValue
  created_by_id: number
  created_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IPerformanceForm {
  id?: number
  user_id: number
  time_blocks: number[]
  reason: string
  startDate: string
  endDate: string
}
