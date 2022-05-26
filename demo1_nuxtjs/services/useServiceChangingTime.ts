import { useResource } from '@/services'
import { IChangingTime } from '@/interfaces/changingTime'

export const useServiceChangingTime = () => {
  const { all } = useResource<IChangingTime>('time-changing')

  return { all }
}
