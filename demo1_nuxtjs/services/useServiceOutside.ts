import { useResource } from '@/services'
import { IOutside } from '@/interfaces/outside'

export const useServiceOutside = () => {
  const { all, add, edit, get, approve, reject } =
    useResource<IOutside>('outsides')

  return { all, add, edit, get, approve, reject }
}
