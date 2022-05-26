import { ref } from '@nuxtjs/composition-api'

export const useOpenCloseToggle = () => {
  const visible = ref<boolean>(false)

  const open = (): void => {
    visible.value = true
  }

  const close = (): void => {
    visible.value = false
  }

  const toggle = (): void => {
    visible.value = !visible.value
  }

  return { visible, open, close, toggle }
}
