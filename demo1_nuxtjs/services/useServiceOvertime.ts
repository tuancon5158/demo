import { useResource } from '@/services'
import { IOvertime } from '@/interfaces/overtime'

export const useServiceOvertime = () => {
  const { all, add, edit, get, approve, reject } =
    useResource<IOvertime>('overtimes')

  return { all, add, edit, get, approve, reject }
}
