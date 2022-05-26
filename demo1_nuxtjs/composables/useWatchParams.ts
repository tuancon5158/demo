import { reactivePick } from '@vueuse/core'
import { watch } from '@nuxtjs/composition-api'
import { IParams } from '@/interfaces/resource'

export const useWatchParams = <F>(params: IParams<F>) => {
  const watchParams = reactivePick(params, 'search', 'per_page', 'filter')

  watch(watchParams, () => {
    params.cur_page = 1
  })
}
