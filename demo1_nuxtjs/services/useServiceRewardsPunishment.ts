import { useResource } from '@/services'
import { IRewardsPunishment } from '@/interfaces/rewardsPunishments'

export const useServiceRewardsPunishment = () => {
  const { all, add, edit, get, approve, reject } =
    useResource<IRewardsPunishment>('rewards-punishments')

  return { all, add, edit, get, approve, reject }
}
