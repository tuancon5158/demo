import { IParams, IResponseV2, IMeta } from '@/interfaces/resource'

export interface IFilterTitles {
  career_path?: number[]
  status?: number[]
  group?: string
  cadre_level?: number
  boundary?: string
}

export type IParamsTitles = IParams<IFilterTitles>

export interface ITitle {
  code: string
  name: string
  career_path?: number
  status: number
  note: string
  max_level: number
  created_by_id: number
  last_updated_by_id: number
  created_at: string
  updated_at: string
  cadre_level?: number
  rank?: number
  group?: number
  boundary?: number
  document: string
}
export interface ITitlesForm {
  code: string
  id?: number
  name: string
  career_path?: number
  status: number
  note: string
  max_level: number
  cadre_level?: number
  rank?: number
  group?: number
  boundary?: number
  document: string
}

export type IResponseTitle = IResponseV2<{
  titles: ITitle[]
  meta_data: IMeta
  overview: {
    total_staff: number
  }
}>

export interface IResponseTitleGet<T> {
  data: {
    title: T
  }
  success: boolean
}
export interface IResponseConfigTitles<T> {
  data: {
    config: T
  }
}
export type ITypeConfig =
  | 'TYPE'
  | 'TYPE_DETAIL'
  | 'STATUS'
  | 'STATUS_DETAIl'
  | 'REPORT_LEVEL'

export type IConfigTitle = {
  [key in ITypeConfig]: Record<string, any>
}
