<template>
  <div class="wrapper">
    <div :class="inLoaded ? '-loaded' : false" class="initial-loading" />
    <div class="contents">
      <Header bg-color="black" @onForcePage="handleForcePage" />
      <Nuxt :key="keyPage" />
      <ButtonTopTop />
      <Footer />
      <Notification
        :status="notification.status"
        :message="notification.message"
        :redirect-to="notification.redirectTo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import Header from '~/components/organisms/Header/Header.vue'
import Footer from '~/components/organisms/Footer/Footer.vue'
import ButtonTopTop from '~/components/atoms/Button/ButtonTopTop.vue'
import { provideLoginUser } from '@/store/login'
import {
  provideWorkspace,
  provideMember,
  provideNotification,
  injectNotification,
  useSetMeta
} from '~/composables'
import Notification from '~/components/molecules/Notification/Notification.vue'

export default defineComponent({
  components: {
    Header,
    Footer,
    Notification,
    ButtonTopTop
  },

  setup() {
    provideLoginUser()
    provideWorkspace()
    provideMember()
    provideNotification()
    const useGlobalNotificationState = injectNotification()
    const notification = useGlobalNotificationState.get()
    // ---------- meta settings ----------
    const { setMeta } = useSetMeta()

    setMeta()

    // force reset page
    const keyPage = ref(0)
    const handleForcePage = () => {
      keyPage.value++
    }

    const inLoaded = ref(false)

    onMounted(() => {
      inLoaded.value = true
    })

    return { notification, keyPage, handleForcePage, inLoaded }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link],
      script: [
        { type: 'text/javascript', src: '//www.youtube.com/player_api', async: true, body: true } // Insert in body
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  min-height: 100vh;
}

.contents {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.initial-loading {
  position: fixed;
  z-index: $z_initialLoading;
  background-color: $color_black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  visibility: visible;
  transition: all 0ms ease 500ms;

  &.-loaded {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
