import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import {
  IConfigDepartment,
  IDepartment,
  IResponseConfigDepartment,
  IResponseDepartment,
  IResponseDepartmentV2,
} from '@/interfaces/department'

interface IParamsChangeStatus {
  status?: number
  id?: number
}

export const useServiceDepartment = () => {
  const url: string = `hrm/v2/departments`
  const context = useContext()
  const { add, edit } = useResource<IDepartment>(`v2/departments`)
  // BE change enpoint get list

  const get = (id: number) => {
    return context.$axios.$get<IResponseDepartmentV2<IDepartment>>(
      `${url}/${id}`
    )
  }
  const all = <P>(params: P) => {
    return context.$axios.$post<IResponseDepartment<IDepartment[]>>(
      `${url}/filter`,
      params
    )
  }

  const getConfig = <P>(params: P) => {
    return context.$axios.$post<IResponseConfigDepartment<IConfigDepartment>>(
      `${url}/config`,
      params
    )
  }

  const changeStatus = (params: IParamsChangeStatus) => {
    return context.$axios.$put(`${url}/change-status`, params)
  }

  return {
    all,
    add,
    edit,
    get,
    getConfig,
    changeStatus,
  }
}
