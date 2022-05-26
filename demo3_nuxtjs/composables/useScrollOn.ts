import { ref, onMounted } from '@nuxtjs/composition-api'
;('~/types/schema/response')

export const useScroll = () => {
  const scrollOnTop = () => {
    onMounted(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
  const scrollOnElement = (id: string) => {
    onMounted(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    })
  }

  return { scrollOnTop, scrollOnElement }
}
