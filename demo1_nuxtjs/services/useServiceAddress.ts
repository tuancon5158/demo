import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'
import { IAddress } from '@/interfaces/staff'

export const useServiceAddress = () => {
  const context = useContext()

  const get = (id: number) => {
    return context.$axios.$get<IResponse<IAddress[]>>(
      `cms/customer/address/all/${id}`
    )
  }

  return { get }
}
