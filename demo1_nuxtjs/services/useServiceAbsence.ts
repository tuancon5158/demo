import { useResource } from '@/services'
import { IAbsence } from '@/interfaces/absence'

export const useServiceAbsence = () => {
  const { all, add, edit, get, approve, reject } =
    useResource<IAbsence>('absences')

  return { all, add, edit, get, approve, reject }
}
