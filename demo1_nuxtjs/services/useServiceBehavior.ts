import { useResource } from '@/services'
import { IBehavior } from '@/interfaces/behavior'

export const useServiceBehavior = () => {
  const { all, add, edit, get } = useResource<IBehavior>('behaviors')

  return { all, add, edit, get }
}
