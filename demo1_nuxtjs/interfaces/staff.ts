import { IProfile } from '@/interfaces/profile'
import { IPosition } from '@/interfaces/position'

export interface IAddress {
  id: number
  name: string
  phone: string
  tinh_thanhpho: string
  quan_huyen: string
  phuong_xa: string
  so_nha: string
}

export interface IStaff {
  id: number
  avatar?: string
  name: string
  code?: string
  phone: string
  email: string
  dob?: string
  cmnd?: string
  role_id: number
  addresses?: IAddress[]
  profile?: IProfile
  branch?: {
    id: number
    name: string
  }
  titles?: IPosition[]
}
