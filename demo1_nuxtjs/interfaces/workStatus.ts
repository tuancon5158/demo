import { IStatusValue } from '@/interfaces/status'

export interface IWorkStatus {
  id: number
  name: string
  parent_id?: number
  status: IStatusValue
  note?: string
  created_at: string
  updated_at: string
}
