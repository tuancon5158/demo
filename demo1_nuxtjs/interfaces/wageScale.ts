import { IParams } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'

type IMoney = number | string

export interface IFilter {
  fromMoney: IMoney
  toMoney: IMoney
  status: number[]
  time_from?: ''
  time_to?: ''
}

export type IParamsWageScale = IParams<IFilter>

export interface IWageScale {
  id: number
  code: string
  amount: IMoney
  status: IStatusValue
  created_at: string
  updated_at: string
}

export interface IWageScaleForm {
  id?: number
  code: string
  amount: IMoney
  status: IStatusValue
}
