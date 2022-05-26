import { computed, ref } from '@nuxtjs/composition-api'
import { useMagicKeys, whenever } from '@vueuse/core'

export const useCollapsed = () => {
  const keys = useMagicKeys()

  const isCollapsed = ref<Boolean>(false)

  const iconCollapsed = computed(() => {
    return isCollapsed.value ? 'menu-unfold' : 'menu-fold'
  })

  const textCollapsed = computed(() => {
    return isCollapsed.value ? 'Mở rộng' : 'Thu gọn'
  })

  const changeCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
  }

  whenever(keys.q, changeCollapsed)

  return { isCollapsed, iconCollapsed, textCollapsed, changeCollapsed }
}
