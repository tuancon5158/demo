import { ref, useContext, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'

export const useReCaptcha = () => {
  const { app } = useContext()

  onMounted(async () => {
    try {
      await app.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  })

  onBeforeUnmount(() => {
    app.$recaptcha.destroy()
  })

  const recaptchaToken = ref('')
  const getRecaptchaToken = async () => {
    try {
      recaptchaToken.value = await app.$recaptcha.execute('contact')
    } catch (e) {
      console.error(e)
    }
  }

  return {
    recaptchaToken,
    getRecaptchaToken
  }
}

export default useReCaptcha
