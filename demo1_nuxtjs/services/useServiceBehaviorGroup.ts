import { useResource } from '@/services'
import { IBehaviorGroup } from '@/interfaces/behaviorGroup'

export const useServiceBehaviorGroup = () => {
  const { all, add, edit, get } = useResource<IBehaviorGroup>('behavior-groups')

  return {
    all,
    add,
    edit,
    get,
  }
}
