import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import {
  IIncomeAmountResponse,
  IIncomeAmountDetail,
} from '@/interfaces/incomeAmountDetail'
import { IAmountType } from '@/interfaces/incomeAmount'
import { IResponseV2 } from '@/interfaces/resource'

export const useServiceIncomeAmountDetail = () => {
  const context = useContext()

  const { add, edit, approveAll, declineAll } =
    useResource<IIncomeAmountDetail>('income-amounts')

  const all = <P>(params: P) => {
    return context.$axios.$post<IIncomeAmountResponse>(
      `hrm/income-amounts/list`,
      params
    )
  }

  const addOutside = <P>(params: P) => {
    return context.$axios.$post(
      `hrm/income-amounts/add-income-outside-system`,
      params
    )
  }

  const approvedAmount = <P>(params: P) => {
    return context.$axios.$put(`hrm/income-amounts/approve`, params)
  }

  const cancelAmount = <P>(params: P) => {
    return context.$axios.$put(`hrm/income-amounts/cancel`, params)
  }

  const getDiscussionsDetails = (params: string) => {
    return context.$axios.$get(`hrm/income-amounts/discussions/${params}`)
  }

  const addDiscussionsDetails = (params: {
    amount_id: number
    message: string
  }) => {
    return context.$axios.$post(`hrm/income-amounts/discussions/create`, params)
  }

  const getHistoryDetails = (params: string) => {
    return context.$axios.$get(`hrm/income-amounts/activity-logs/${params}`)
  }

  const getTypes = () => {
    return context.$axios.$get<IResponseV2<IAmountType[]>>(
      `hrm/income-amounts/types`
    )
  }

  return {
    all,
    add,
    edit,
    getTypes,
    approveAll,
    declineAll,
    addOutside,
    getHistoryDetails,
    addDiscussionsDetails,
    getDiscussionsDetails,
    approvedAmount,
    cancelAmount,
  }
}
