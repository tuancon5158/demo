import { useResource } from '@/services'
import { IPerformance } from '@/interfaces/performance'

export const useServicePerformance = () => {
  const { all, add, edit, get } = useResource<IPerformance>('perfs')

  return { all, add, edit, get }
}
