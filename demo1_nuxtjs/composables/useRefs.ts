import { onBeforeUpdate, ref } from '@nuxtjs/composition-api'
import { MaybeElementRef } from '@vueuse/core'

export const useRefs = () => {
  const itemRefs = ref<MaybeElementRef[]>([])

  const setItemRefs = (el: MaybeElementRef) => {
    itemRefs.value.push(el)
  }

  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  return [itemRefs, setItemRefs]
}
