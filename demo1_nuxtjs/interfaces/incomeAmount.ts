import { E_Duration } from '@/enums/incomeAmount'
import { IUser } from '@/interfaces/user'
import { IParams } from '@/interfaces/resource'
import { IDepartment } from '@/interfaces/department'

export type E_Stage = 'CREATED' | 'PENDING' | 'APPROVED' | 'READY_FOR_PAY'
export type E_Status = 'APPROVED' | 'REJECTED'

export interface IFilter {
  duration: number[]
  dept_id: number[]
  type_id: number[]
  status: string[]
  stage: E_Stage[]
  approved_date_from?: string
  approved_date_to?: string
}

export type IParamsIncomeAmount = IParams<Partial<IFilter>>

export type ICalculateType = 'ADD' | 'SUB'

export interface IAmountType {
  id: number
  name: string
  code: string
  type: number
  calculate_type: ICalculateType
  created_at?: string
  updated_at?: string
}

export interface IDiscussion {
  id: number
  amount_detail_id: number
  message: string
  created_at: string
  updated_at: string
  user: IUser
}

export interface IIncomeAmount {
  id: number
  name: string
  amount: {
    duration: E_Duration
    month: number
    quarter: number
    year: number
  }
  user: IUser
  department: IDepartment
  type: IAmountType
  approved_amount: null | number
  calculated_amount: number
  additional_amount: number
  policy_details: null
  payment_approved_at: null
  status: E_Status
  note: null | string
  income_outside_system: {
    name: string
  }
  discussion: IDiscussion
  attachments: null | string[]
  created_at: string
  updated_at: string
  additional_amount_same_format?: number
  calculated_amount_same_format?: number
  approved_amount_same_format?: number
}
