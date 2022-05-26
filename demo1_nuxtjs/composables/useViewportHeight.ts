import { onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { useCssVar } from '@vueuse/core'

export const useViewportHeight = () => {
  const heightUnit = useCssVar('--vh')

  const genViewportHeight = () => {
    heightUnit.value = `${window.innerHeight * 0.01}px`
  }

  onMounted(() => {
    genViewportHeight()
    window.addEventListener('resize', genViewportHeight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', genViewportHeight)
  })
}
