import { useResource } from '@/services'
import { IInvoiceParticipant } from '@/interfaces/invoiceParticipant'

export const useServiceInvoiceParticipant = () => {
  const { all, add, edit, get } = useResource<IInvoiceParticipant>(
    'invoice-participant',
    'cms'
  )

  return { all, add, edit, get }
}
