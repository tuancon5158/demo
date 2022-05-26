import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'
import { IStaff } from '@/interfaces/staff'

export const useServiceStaff = () => {
  const context = useContext()

  const get = (id: number) => {
    return context.$axios.$get<IResponse<IStaff>>(`cms/staff/detail/${id}`)
  }

  const update = (params: any) => {
    return context.$axios.$post(`cms/staff/edit`, params)
  }

  return { get, update }
}
