import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import { ITitle, IResponseTitleGet, IResponseTitle } from '@/interfaces/titles'
interface IParamsChangeStatus {
  status?: number
  id?: number
}

export const useServiceTitles = () => {
  const url: string = `hrm/v2/titles`
  const context = useContext()
  const { add, edit } = useResource<ITitle>(`v2/titles`)
  // BE change enpoint get list

  const get = (id: number) => {
    return context.$axios.$get<IResponseTitleGet<ITitle>>(`${url}/${id}`)
  }
  const all = <P>(params: P) => {
    return context.$axios.$post<IResponseTitle>(`${url}/filter`, params)
  }

  const changeStatus = (params: IParamsChangeStatus) => {
    return context.$axios.$put(`${url}/change-status`, params)
  }

  return {
    all,
    add,
    edit,
    get,
    changeStatus,
  }
}
