import { IParams, IMeta } from '@/interfaces/resource'
import { IStatusValue } from '@/interfaces/status'

export interface IFilterDepartment {
  type?: number
  report_level?: string
  status?: number[]
}

export type IParamsDepartment = IParams<IFilterDepartment>

export interface IDepartment {
  code: string
  status_detail: string
  total_staff: number
  commune: number
  district: number
  province: number
  phone: string
  parent_id: number
  report_level: string
  document: string
  feature: string
  tasks: string
  id: number
  name: string
  type: number
  status: IStatusValue
  note: string
  street: string
  created_at: string
  updated_at: string
  type_name: string
  parent_name: string
}

export interface IDepartmentForm {
  code: string
  commune: number | undefined
  district: number | undefined
  province: number | undefined
  phone: string
  parent_id: number | undefined
  report_level: string
  document: string
  feature: string
  tasks: string
  id?: number
  name: string
  type: number
  note: string
  street: string | undefined
}

export interface IResponseDepartment<T> {
  data: {
    departments: T
    meta_data: IMeta
    overview: {
      total_staff: number
    }
  }
  success: boolean
}

export interface IResponseDepartmentV2<T> {
  data: {
    department: T
  }
  success: boolean
}
export interface IResponseConfigDepartment<T> {
  data: {
    config: T
  }
}
export interface IConfigDepartment {
  TYPE: object
  TYPE_DETAIL: object
  STATUS: object
  STATUS_DETAIl: object
  REPORT_LEVEL: object
}
