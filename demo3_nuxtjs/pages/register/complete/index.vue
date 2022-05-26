<template>
  <RegisterCompletTemplate :is-successed="isSuccessed" :is-loading="isLoading" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
  useRoute,
  useMeta
} from '@nuxtjs/composition-api'
import RegisterCompletTemplate from '~/components/old/templates/register/RegisterCompletTemplate.vue'

export default defineComponent({
  name: 'RegisterComplet',

  auth: false,

  components: {
    RegisterCompletTemplate
  },

  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    // set meta
    title.value = `${app.i18n.t('meta.register.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.register.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.register.title')} | comony`
      }
    ]

    const route = useRoute()
    const isLoading = ref<boolean>(true)
    const isSuccessed = ref<boolean>(false)

    onMounted(async () => {
      isLoading.value = true

      // get quest params
      const requestValues = {
        email: route.value.query.email as string,
        confirmCode: route.value.query.confirmCode as string
      }

      requestValues.email = requestValues.email.replace(' ', '+')

      await app
        .$repository('auth')
        .confirmCode(requestValues)
        .then(() => {
          isSuccessed.value = true
        })
        .catch(() => {
          isSuccessed.value = false
        })

      isLoading.value = false
    })

    return {
      isLoading,
      isSuccessed
    }
  },

  head: {}
})
</script>
