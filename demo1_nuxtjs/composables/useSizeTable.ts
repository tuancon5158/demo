import { computed, nextTick, ref, watch } from '@nuxtjs/composition-api'
import { useWindowSize } from '@vueuse/core'

export const useSizeTable = (hasPagination = true) => {
  const { height, width } = useWindowSize()
  const heightPaginationDefault = 150

  const top = ref(0)

  const heightPagination = computed(() =>
    hasPagination ? heightPaginationDefault : 100
  )

  const heightTable = computed(() => {
    return height.value - top.value - heightPagination.value
  })

  const setOffsetTopTable = async () => {
    await nextTick()

    setTimeout(() => {
      const tableEl = document.querySelector(
        '.ant-table-wrapper'
      ) as HTMLElement

      top.value = tableEl.offsetTop
    }, 200)
  }

  watch([height, width], setOffsetTopTable, { immediate: true })

  return { heightTable }
}
