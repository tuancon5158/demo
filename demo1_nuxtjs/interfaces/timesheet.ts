import { IStatusValue } from '@/interfaces/status'
import { IUser } from '@/interfaces/user'
import { IParams } from '@/interfaces/resource'

export interface IFilter {
  status?: number[]
  created_by_id?: number[]
  time_from?: string
  time_to?: string
}

export type IParamsTimesheet = IParams<IFilter>

export type IShift = [number, number]
export type ITimeLineKey = 2 | 3 | 4 | 5 | 6 | 7 | 8
export type ITimeLineValue = IShift[]
export type ITimeline = {
  [index in ITimeLineKey]: ITimeLineValue
}

export interface ITimesheet {
  id: number
  name: string
  description: string
  status: IStatusValue
  note: string
  created_by_id: number
  created_by_user: IUser
  timeline: ITimeline
  created_at: string
}

export interface ITimesheetForm {
  name: string
  status: IStatusValue
  note: string
  timeline: ITimeline
}
