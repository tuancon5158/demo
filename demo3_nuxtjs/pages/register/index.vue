<template>
  <RegisterTemplate
    :status="status"
    :values="values"
    :server-error="serverError"
    :is-loading="isLoading"
    @onClickConfirm="handleClickConfirm"
    @onClickBackInput="handleClickBackInput"
    @onClickSubmit="handleClickSubmit"
    @onClickSNSLogin="handleSNSLogin"
  />
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta, onUpdated } from '@nuxtjs/composition-api'
import RegisterTemplate from '~/components/old/templates/register/RegisterTemplate.vue'
import { useRegister, useScroll } from '~/composables'

export default defineComponent({
  name: 'Register',

  auth: false,

  components: {
    RegisterTemplate
  },

  setup() {
    // ---------------- /////////////////////// ----------------
    const { app } = useContext()
    const { title, meta } = useMeta()
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    onUpdated(() => {
      scrollOnTop()
    })

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

    return {
      ...useRegister()
    }
  },

  head: {}
})
</script>
