import { useResource } from '@/services'
import { IPoint } from '@/interfaces/point'

export const useServicePoint = () => {
  const { all, edit } = useResource<IPoint>('points')

  return { all, edit }
}
