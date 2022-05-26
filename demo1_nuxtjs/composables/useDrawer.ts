import { ref } from '@nuxtjs/composition-api'

export const useDrawer = () => {
  const visible = ref(false)

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  const toggle = () => {
    visible.value = !visible.value
  }

  return { visible, open, close, toggle }
}
