import { IParams, IResponseV2 } from '@/interfaces/resource'
import { IPosition } from '@/interfaces/position'
import { IWageWeight } from '@/interfaces/wageWeight'
import { IUser } from '@/interfaces/user'
import { IDepartment } from '@/interfaces/department'
import { IWageScale } from '@/interfaces/wageScale'

export interface IFilter {
  area_id?: number[]
  work_status_id?: number
  dept_id?: number[]
  title_id?: number[]
  work_status_child_id?: number | null | undefined
  time_from?: string
  time_to?: string
  date_of_joining?: string
}

export type IParamsProfile = IParams<IFilter>

export interface IProfile {
  user_id: number
  date_of_joining: string
  labor_contracts: string[]
  hr_records: string[]
  dept_id: number
  department: IDepartment
  area_id: number
  work_status_id: number
  work_status?: number
  account_branch?: number
  direct_manager_id: number
  direct_manager: IUser
  status: number
  wage_weights: IWageWeight[]
  titles: IPosition[]
  wage_scale_id: number
  wage_scale: IWageScale
  salary_formula?: 24 | 26
  time_sheet_id: number
  note?: string
  created_by_id: number
  created_by_user: IUser
  last_updated_by_id: number
  last_updated_by_user: IUser
  created_at: string
  updated_at: string
}

export interface IProfileV2 {
  area_id?: string
  avatar: string
  cmnd: string
  dob: string
  date_of_issue?: string
  date_of_joining?: string
  dept_id?: string
  direct_manager_id?: string
  email: string
  email_business: string
  first_name: string
  gender: string
  images_cmnd: string[]
  last_name: string
  level: string
  literacy: string
  note?: string
  password: string
  permanent_residence_commune?: string | number
  permanent_residence_district?: string | number
  permanent_residence_province?: string | number
  permanent_street?: string | number
  phone: string
  place_of_issue: string
  salary_formula?: string
  temporary_residence_commune?: string | number
  temporary_residence_district?: string | number
  temporary_residence_province?: string | number
  temporary_street?: string | number
  titles: any[]
  role_id?: string
  wage_scale_id?: string
  work_status_id?: string
}
export interface IProfileII {
  staffs: []
  meta_data: any
}

export interface ITitle {
  id?: number
  level?: number
}

export interface IProfileForm {
  user_id: number
  dept_id?: number
  area_id: number
  work_status_id: number | null
  wage_scale_id?: number
  salary_formula: 24 | 26
  date_of_joining: string | null
  labor_contracts?: string[]
  hr_records?: string[]
  direct_manager_id?: number
  time_sheet_id: number | null
  wage_weights: number[]
  wage_weight_id: number[]
  titles: ITitle[]
}

export interface IStaffInfo {
  id: number
  name: string
}
export interface IStaffNameAndIdData {
  all_staff: IStaffInfo[]
}

export interface IJobTitle {
  id: string
  name: string
}

export type IGetAllStaffResonpse = IResponseV2<IStaffNameAndIdData>
