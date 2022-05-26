import { ITimesheet } from '@/interfaces/timesheet'
import { ITimeBlock } from '@/interfaces/timeBlock'

export interface IParamsGetDateOfUser {
  user_id: number
  date: string
}

export interface IDataDateOfUser {
  date: string
  id: number
  user_id: number
  time_blocks: ITimeBlock[]
  user: {
    area_id: number
    branch: number | null
    branch_id: number | null
    id: number
    name: string
    time_sheet: ITimesheet
    time_sheet_id: number
  }
}
