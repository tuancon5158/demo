import { useResource } from '@/services'
import { IPosition } from '@/interfaces/position'

export const useServicePosition = () => {
  const { all, add, edit, get } = useResource<IPosition>('titles')

  return { all, add, edit, get }
}
