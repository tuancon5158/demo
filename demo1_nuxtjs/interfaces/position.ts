import { IParams } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'

export interface IFilter {
  career_path: number[]
  status: number[]
  time_from?: string
  time_to?: string
}

export type IParamsPosition = IParams<IFilter>

export interface IPosition {
  id: number
  name: string
  career_path: number
  status: IStatusValue
  note: string
  max_level: number
  created_at: string
  updated_at: string
}

export interface IPositionForm {
  id?: number
  name: string
  career_path: number
  status: IStatusValue
  note: string
  max_level: number
}
