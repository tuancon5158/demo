import { IProfile } from '@/interfaces/profile'

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
  avatar?: string | null
  has_email_verified?: boolean
  has_phone_verified?: boolean
}

export interface ICurrentUser extends IProfile {
  account_balance: number
  avatar: string | null
  branch_id: string | null
  branch: {
    name: string
  }
  cmnd: string | null
  company: string | null
  cong_no: number
  dob: string | null
  email: string | null
  facebook: string | null
  gender: number
  giao_dich_cuoi: string | null
  id: number
  job: string | null
  name: string | null
  pending_exchange_amount: number
  pending_payment_amount: number
  permissions: string[]
  phone: string | null
  phuong_xa: string | null
  quan_huyen: string | null
  quy_nganhang: number
  quy_tienmat: number
  role: string | null
  so_nha: string | null
  taxcode: string | null
  ten_doanh_nghiep: string | null
  tinh_thanhpho: string | null
  tong_mua: number
  tong_tra: number
  total_bought: number
  manage_user_ids: number[]
}
