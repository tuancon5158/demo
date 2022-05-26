import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import { IPolicy, IResponseInvoiceRole } from '@/interfaces/policy'
import { IResponse } from '@/interfaces/resource'

export const useServicePolicy = () => {
  const context = useContext()

  const { all, add, edit, get } = useResource<IPolicy>('perf-policies')

  const loadInvoiceRole = () => {
    return context.$axios.$get<IResponse<IResponseInvoiceRole>>(
      `cms/invoices-roles`
    )
  }

  return {
    all,
    add,
    edit,
    get,
    loadInvoiceRole,
  }
}
