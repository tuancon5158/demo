import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'

type Prefix = 'hrm' | 'cms'

export const useResource = <T>(resource: string, prefix: Prefix = 'hrm') => {
  const context = useContext()

  const all = <P>(params: P) => {
    return context.$axios.$post<IResponse<T[]>>(
      `${prefix}/${resource}/list`,
      params
    )
  }
  const getListAll = <P>(params: P) => {
    return context.$axios.$post<IResponse<T>>(`${prefix}/${resource}`, params)
  }

  const add = <P>(params: P) => {
    return context.$axios.$post(`${prefix}/${resource}`, params)
  }

  const edit = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}`, params)
  }

  const get = (id: number) => {
    return context.$axios.$get<IResponse<T>>(`${prefix}/${resource}/${id}`)
  }

  const getDashboard = () => {
    return context.$axios.$get(`${prefix}/${resource}/`)
  }

  const approve = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}/approve`, params)
  }

  const decline = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}/cancel`, params)
  }

  const approveAll = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}/approve-all`, params)
  }

  const declineAll = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}/cancel-all`, params)
  }

  const reject = <P>(params: P) => {
    return context.$axios.$put(`${prefix}/${resource}/reject`, params)
  }

  return {
    all,
    add,
    edit,
    get,
    approve,
    decline,
    approveAll,
    declineAll,
    reject,
    getDashboard,
    getListAll,
  }
}
