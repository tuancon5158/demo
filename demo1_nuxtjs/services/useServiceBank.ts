import { useContext } from '@nuxtjs/composition-api'
import { IResponseV2 } from '@/interfaces/resource'

export interface IBank {
  name?: String
  number?: String
  bank_id?: String
  object?: {
    id: any
    type: Number
  }
  default?: Boolean
}

export const useServiceBank = () => {
  const url: string = `/cms/account-bank`
  const context = useContext()
  // BE change enpoint get list

  const getBank = () => {
    return context.$axios.$get<IResponseV2<IBank[]>>(`${url}/index`)
  }
  const addBank = <P>(params: P) => {
    return context.$axios.$post(`${url}/store-to-object`, params)
  }

  const deleteBank = <P>(params: P) => {
    return context.$axios.$post(`${url}/delete-of-object`, params)
  }
  const updateBank = <P>(params: P) => {
    return context.$axios.$post<IBank>(`${url}/update-to-object`, params)
  }
  const getBankUser = <P>(params: P) => {
    return context.$axios.$post<IResponseV2<IBank[]>>(
      `${url}/object-list`,
      params
    )
  }
  const setBankDefault = <P>(params: P) => {
    return context.$axios.$post<IBank>(`${url}/update-to-object`, params)
  }

  return {
    addBank,
    getBank,
    deleteBank,
    getBankUser,
    setBankDefault,
    updateBank,
  }
}
