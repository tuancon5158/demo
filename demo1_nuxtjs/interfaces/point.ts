export interface IFilter {
  user_id: number
  branch_id: number[]
  dept_id: number[]
  title_id: number[]
  year: number
  month: number
  quarter: number
}

export interface IParamsPoint {
  view_mode: 'company' | 'personal' | 'branch_dept'
  filter: Partial<IFilter>
}

interface ITitle {
  id: number
  name: string
  pivot: {
    profile_id: number
    title_id: number
    level: number
  }
}

export interface IPoint {
  id: number
  name: string
  titles: ITitle[]
  branch_id: number
  branch: {
    id: number
    name: string
  }
  dept_id: number | null
  department: {
    id: number
    name: string
  }
  points: number
}
