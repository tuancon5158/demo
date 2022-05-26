import { IParams, IFilter } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'
import { IUser } from '@/interfaces/user'

export interface IFilterBehaviorGroup extends IFilter {
  name: string[]
}

export type IParamsBehaviorGroup = IParams<IFilterBehaviorGroup>

export interface IBehaviorGroup {
  id: number
  name: string
  description: string
  status: IStatusValue
  created_by_id: number
  created_by_user: IUser
  last_updated_by_id: string | null
  last_updated_by_user: string | null
  created_at: string
  updated_at: string
}

export interface IBehaviorGroupForm {
  id?: number
  name: string
  description: string
  status: IStatusValue
}
